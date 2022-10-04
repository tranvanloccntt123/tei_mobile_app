export const BASE = "https://tei-source.com/api/v1";
export const STOREAGE = "https://tei-source.com/storage/app";
//api for authentication
const BASE_AUTH = `/auth`;
export const LOGIN_API_SIGNIN: string = `${BASE_AUTH}/login`;
export const LOGIN_API_SIGNUP: string = `${BASE_AUTH}/register`;
//api for chat
const BASE_CHAT = `/chat`;
export const CHAT_API_GET_LIST: string = `${BASE_CHAT}/list`;
export const CHAT_API_GET_MESSAGES: string = `${BASE_CHAT}/messages`;
export const CHAT_API_SEND_MESSAGE: string = `${BASE_CHAT}/send`;
export const CHAT_API_GET_ROOM: string = `${BASE_CHAT}/get/group`;
//api for profile
const BASE_PROFILE = `/profile`;
export const PROFILE_API_VISIT: string = `${BASE_PROFILE}/visit`;
export const PROFILE_API_RELATION_LIST: string = `${BASE_PROFILE}/relation/list`;
export const PROFILE_API_RELATION_REQUEST: string = `${BASE_PROFILE}/relation/request`;
export const PROFILE_API_RELATION_CHECK: string = `${BASE_PROFILE}/relation/check`;
export const PROFILE_API_CHANGE_DETAIL: string = `${BASE_PROFILE}/change/detail`;
export const PROFILE_API_RELATION_NEAR_CREATE: string = `${BASE_PROFILE}/relation/near/description`;
export const PROFILE_API_SEARCH: string = `${BASE_PROFILE}/search`;
export const PROFILE_API_CHANGE_AVATAR: string = `${BASE_PROFILE}/change/avatar`;
//api for post
const BASE_POST = `/post`;
export const POST_API_CREATE: string = `${BASE_POST}/create`;
export const POST_API_LIST: string = `${BASE_POST}/list`;
export const POST_API_DELETE: string = `${BASE_POST}/delete`;
export const POST_API_UPDATE: string = `${BASE_POST}/update`;