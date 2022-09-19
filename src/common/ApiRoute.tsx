const BASE = "https://tei-source.com/api/v1";
export const STOREAGE = "https://tei-source.com/storage/app";
//api for authentication
const BASE_AUTH = `${BASE}/auth`;
export const LOGIN_API_SIGNIN: string = `${BASE_AUTH}/login`;
export const LOGIN_API_SIGNUP: string = `${BASE_AUTH}/register`;
//api for chat
const BASE_CHAT = `${BASE}/chat`;
export const CHAT_API_GET_LIST: string = `${BASE_CHAT}/list`;
export const CHAT_API_GET_MESSAGES: string = `${BASE_CHAT}/messages`;
export const CHAT_API_SEND_MESSAGE: string = `${BASE_CHAT}/send`;
//api for profile
const BASE_PROFILE = `${BASE}/profile`;
export const PROFILE_API_VISIT: string = `${BASE_PROFILE}/visit`;
export const PROFILE_API_RELATION_LIST: string = `${BASE_PROFILE}/relation/list`;
export const PROFILE_API_RELATION_REQUEST: string = `${BASE_PROFILE}/relation/request`;
//api for post
const BASE_POST = `${BASE}/post`;
export const POST_API_CREATE: string = `${BASE_POST}/create`;
export const POST_API_LIST: string = `${BASE_POST}/list`;
export const POST_API_DELETE: string = `${BASE_POST}/delete`;
export const POST_API_UPDATE: string = `${BASE_POST}/update`;