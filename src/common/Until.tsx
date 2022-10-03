import { ApiRequest } from "./ApiRequest";
import { LOGIN_API_SIGNIN, LOGIN_API_SIGNUP, POST_API_CREATE, POST_API_DELETE, POST_API_LIST, POST_API_UPDATE, PROFILE_API_RELATION_LIST, PROFILE_API_VISIT, PROFILE_API_RELATION_REQUEST, PROFILE_API_RELATION_CHECK, PROFILE_API_CHANGE_DETAIL, PROFILE_API_SEARCH, PROFILE_API_RELATION_NEAR_CREATE, CHAT_API_GET_ROOM, PROFILE_API_CHANGE_AVATAR } from "./ApiRoute";

let regex = /^[a-zA-Z0-9]{6,15}/;

let regexURL = /^https:\/\/tei-source\.com\/storage\/app(\/[a-z]+)+/

export const RESPONSE_SUCCESS:string = "success";

export const RESPONSE_FAIL:string = "fail";

export const Authentication = async (user: string, pass: string) => {
    let result = await ApiRequest.build("POST", "application/json")(LOGIN_API_SIGNIN, {username: user, password: pass});
    if(result.status < 200 && result.status >= 300) return null;
    let r: ResponseInterface = result.data;
    if(!r || r.status == undefined || r.status.toLowerCase() == RESPONSE_FAIL) return null;
    return result.data;
}

export const Registration = async (name: string, username: string, password: string) => {
    let result = await ApiRequest.build("POST", "application/json")(LOGIN_API_SIGNUP, {name: name, username: username, password: password});
    if(result.status < 200 && result.status >= 300) return false;
    let r: ResponseInterface = result.data;
    if(!r || r.status == undefined || r.status.toLowerCase() == RESPONSE_FAIL) return false;
    return result.data;
}

export const CheckUser = (user: string) => regex.test(user);

export const CheckPass = (pass: string) => regex.test(pass);

export const CheckUrl = (url: string) => regexURL.test(url);

export const CheckAuthentication = (user: string, pass: string) : boolean => {
    let checkUser = regex.test(user);
    if(!checkUser) return false;
    let checkPass = regex.test(pass);
    if(!checkPass) return false;
    return true;
}


// until for chat
import { Platform } from "react-native";
import { CHAT_API_GET_LIST, CHAT_API_GET_MESSAGES, CHAT_API_SEND_MESSAGE, STOREAGE } from "./ApiRoute"
import { CheckRelationInterface, GroupMessageInterface, PaginateInterface, ProfileInterface, ResponseInterface, VisitProfile } from "./AppInterface";
import { getRelationShipName, RelationShipEnum, TypeMessage } from "./AppEnum";
import { IMessage } from "react-native-gifted-chat";
import { MessageFactory } from "../Factory/MessageFactory";

export const getListChat = async (): Promise<PaginateInterface | null> => {
  let result = await ApiRequest.build('GET')(CHAT_API_GET_LIST);
  if(result.status < 200 && result.status >= 300) return null;
  let r: ResponseInterface = result.data;
  if(!r || r.status == undefined || r.status.toLowerCase() == RESPONSE_FAIL) return null;
  let paginate: PaginateInterface = result.data.message
  return paginate;
}

export const getMessages = async (id: number, left_id: string | number = 0): Promise<PaginateInterface | null> => {
  let result:any = null;
  result = left_id? await ApiRequest.build('GET')(CHAT_API_GET_MESSAGES, { id, left_id }) : await ApiRequest.build('GET')(CHAT_API_GET_MESSAGES, { id });
  if(result.status < 200 && result.status >= 300) return null;
  let r: ResponseInterface = result.data;
  if(!r || r.status == undefined || r.status.toLowerCase() == RESPONSE_FAIL) return null;
  let paginate: PaginateInterface = result.data.message;
  return paginate;
}

export const sendMessages = async (id: number, type: TypeMessage, content: any, name?: string, typeFile?: string): Promise<ResponseInterface | null> => {
  let formData = new FormData();
  formData.append('id', id);
  formData.append('type', type);
  formData.append('content', type == 'text' ? content : {
    name: name,
    type: typeFile,
    uri:
      Platform.OS === 'android' ? content : content.replace('file://', ''),
  });
  let result = await ApiRequest.build('POST', 'multipart/form-data')(CHAT_API_SEND_MESSAGE, formData);
  if(result.status < 200 && result.status >= 300) return null;
  let r: ResponseInterface = result.data;
  return r.message;
}

export const getVisitProfile = async (id?: number): Promise<VisitProfile | null> => {
  let result = await ApiRequest.build('GET')(PROFILE_API_VISIT, id? {user_id: id} : {});
  if(result.status < 200 && result.status >= 300) return null;
  let r: ResponseInterface = result.data;
  if(!r || r.status == undefined || r.status.toLowerCase() == RESPONSE_FAIL) return null;
  return r.message;
}

export const updateProfile = async (user: ProfileInterface): Promise<ProfileInterface | null> =>  {
  let result = await ApiRequest.build('POST', 'application/json')(PROFILE_API_CHANGE_DETAIL, {name: user.name, email: user.email, description: user.description});
  if(result.status < 200 && result.status >= 300) return null;
  let r: ResponseInterface = result.data;
  return r.message.user;
}

export const getListFriend = async (left_id?: number, page?: number) : Promise<PaginateInterface | null> => {
  let data:any = {};
  if(left_id) data.left_id = left_id;
  if(page) data.page = page;
  let result = await ApiRequest.build('GET')(PROFILE_API_RELATION_LIST, data);
  if(result.status < 200 && result.status >= 300) return null;
  let r: ResponseInterface = result.data;
  if(!r || r.status == undefined || r.status.toLowerCase() == RESPONSE_FAIL) return null;
  let paginate: PaginateInterface = result.data.message;
  return paginate;
}

// api for post
export const sendPost = async (content: string, name?: string, type?: string, media?: any): Promise<string | null> => {
  let result;
  let formData = new FormData();
  formData.append('content', content);
  if(media && name && type){
    formData.append('media', {
      name: name,
      type: type,
      uri: Platform.OS === 'android' ? media : media.replace('file://', ''),
    })
  } 
  result = await ApiRequest.build('POST', 'multipart/form-data')(POST_API_CREATE, formData);
  if(result.status < 200 && result.status >= 300) return null;
  if(result.data.status.toLowerCase() == RESPONSE_FAIL) return null;
  return result.data.message.UUID;
}

export const updatePost = async (uuid: string, content: string, name?: string, type?: string, media?: any) : Promise<boolean> => {
  if(!content) return false;
  if(!checkUUIDRegex(uuid)) return false;
  let formData = new FormData();
  formData.append('content', content);
  formData.append('uuid', uuid);
  if(media && name && type){
    formData.append('media', {
      name: name,
      type: type,
      uri: Platform.OS === 'android' ? media : media.replace('file://', ''),
    })
  } 
  let result = await ApiRequest.build('POST', 'multipart/form-data')(POST_API_UPDATE, formData);
  if(result.status < 200 && result.status >= 300) return false;
  let r: ResponseInterface = result.data;
  if(!r || r.status == undefined || r.status.toLowerCase() == RESPONSE_FAIL)
    return false;
  return true;
}

export const getListPost = async (left_id?: number, page?: number, user_id?: number): Promise<PaginateInterface | null> => {
  let data:any = {};
  if(left_id) data.left_id = left_id;
  if(page) data.page = page;
  if(user_id) data.user_id = user_id;
  let result = await ApiRequest.build('GET', 'application/json')(POST_API_LIST, data);
  if(result.status < 200 && result.status >= 300) return null;
  let r: ResponseInterface = result.data;
  if(!r || r.status == undefined || r.status.toLowerCase() == RESPONSE_FAIL)
    return null;
  return r.message;
}

export const deletePost = async (uuid: string): Promise<boolean> => {
  if(!checkUUIDRegex(uuid)) return false;
  let result = await ApiRequest.build('POST', 'application/json')(POST_API_DELETE, {uuid});
  if(result.status < 200 && result.status >= 300) return false;
  let r: ResponseInterface = result.data;
  if(!r || r.status == undefined || r.status.toLowerCase() == RESPONSE_FAIL) return false;
  return true;
}

export const checkUUIDRegex = (r: string) => {
  return (/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i).test(r);
}

export const sendRelationShip = async (id: number, status: RelationShipEnum) => {
  let result = await ApiRequest.build('POST', 'application/json')(PROFILE_API_RELATION_REQUEST, {friend: id, status: getRelationShipName(status)});
  if(result.status < 200 && result.status >= 300) return null;
  let r: ResponseInterface = result.data;
  if(!r || r.status == undefined || r.status.toLowerCase() == RESPONSE_FAIL) return null;
  return r.message;
}

export const checkRelationShip = async (id: number) : Promise<CheckRelationInterface | null> => {
  let result = await ApiRequest.build('GET', 'text/html')(PROFILE_API_RELATION_CHECK, {user_id: id});
  if(result.status < 200 && result.status >= 300) return null;
  let r: ResponseInterface = result.data;
  if(!r || r.status == undefined || r.status.toLowerCase() == RESPONSE_FAIL) return null;
  return r.message;
}

export const searchUser = async(keyword: string) : Promise<any | null> => {
  let result = await ApiRequest.build('GET', 'application/json')(PROFILE_API_SEARCH, {keyword: keyword});
  if(result.status < 200 && result.status >= 300) return null;
  let r: ResponseInterface = result.data;
  if(!r || r.status == undefined || r.status.toLowerCase() == RESPONSE_FAIL) return null;
  return r.message;
}

export const sendDetailRelationShip = async (user_id: number, description: string, start: any) => {
  let result = await ApiRequest.build('POST', 'application/json')(PROFILE_API_RELATION_NEAR_CREATE, {user_id: user_id, description, start});
  if(result.status < 200 && result.status >= 300) return null;
  let r: ResponseInterface = result.data;
  if(!r || r.status == undefined || r.status.toLowerCase() == RESPONSE_FAIL) return null;
  return r.message;
}

function renderStorage(content:string = ""){
  let result: string | null | undefined = undefined;
  if(content) result = `${STOREAGE}/${content}`;
  return result;
}

function renderDate(data: string | undefined){
  let date;
  if(data) date =  new Date(data);
  else date = new Date();
  return date;
}

export const renderIMessage = (value: GroupMessageInterface, index: number): IMessage => {
  let user = new MessageFactory("user", value.user).build();
  user = user? user : {
    _id: '0', 
    name: '',
    avatar: "https://placeimg.com/140/140/any"
  };
  return {
    _id: value.id,
    text: value.type == 'text' ? value.content : '',
    image: value.type == 'image'? renderStorage(value.content) : undefined,
    user: user,
    createdAt: renderDate(value.created_at)
  }
}

export const getOrCreateRoomMessage = async (user_id: number) => {
  let result = await ApiRequest.build('GET', 'text/html')(CHAT_API_GET_ROOM, {single: true, user_id});
  if(result.status < 200 && result.status >= 300) return null;
  let r: ResponseInterface = result.data;
  if(!r || r.status == undefined || r.status.toLowerCase() == RESPONSE_FAIL) return null;
  return r.message;
}

export const changeAvatar = async (path: any, name?: string, typeFile?: string) => {
  let formData = new FormData();
  formData.append('avatar', {
    name: name,
    type: typeFile,
    uri:
      Platform.OS === 'android' ? path : path.replace('file://', ''),
  });
  let result = await ApiRequest.build('POST', 'multipart/form-data')(PROFILE_API_CHANGE_AVATAR, formData);
  if(result.status < 200 && result.status >= 300) return null;
  let r: ResponseInterface = result.data;
  if(!r || r.status == undefined || r.status.toLowerCase() == RESPONSE_FAIL) return null;
  return r.message;
}