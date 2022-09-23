import { ApiRequest } from "../common/ApiRequest"
import { LOGIN_API_SIGNIN, LOGIN_API_SIGNUP } from "../common/ApiRoute";

let regex = /^[a-zA-Z0-9]{6,15}/;

export const RESPONSE_SUCCESS:string = "success";
export const RESPONSE_FAIL:string = "fail";

export const Authentication = async (user: string, pass: string) => {
    let result = await ApiRequest.build("POST", "application/json")(LOGIN_API_SIGNIN, {username: user, password: pass});
    return result.data;
}

export const Registration = async (name: string, username: string, password: string) => {
    let result = await ApiRequest.build("POST", "application/json")(LOGIN_API_SIGNUP, {name: name, username: username, password: password});
    return result.data;
}

export const CheckUser = (user: string) => regex.test(user);

export const CheckPass = (pass: string) => regex.test(pass);

export const CheckAuthentication = (user: string, pass: string) : boolean => {
    let checkUser = regex.test(user);
    if(!checkUser) return false;
    let checkPass = regex.test(pass);
    if(!checkPass) return false;
    return true;
}