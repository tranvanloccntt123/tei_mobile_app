import axios, {AxiosRequestConfig, AxiosRequestHeaders, Method} from "axios";
import { BASE } from "./ApiRoute";

export type ContentType = 'text/html' | 'multipart/form-data' | 'x-www-form-urlencoded' | 'application/json';
let baseApiRequest = axios.create({
    baseURL: BASE, 
    timeout: 30000
});
export class ApiRequest{
    static token: string
    static applicationId: string

    static setToken(token: string){
        ApiRequest.token = token;
        baseApiRequest.defaults.headers.common['Authorization'] = `Bearer ${ApiRequest.token}`;
    }

    static build(method:Method = 'GET', contentType: ContentType = 'text/html'){
        let params = {
            application_id: ApiRequest.applicationId
        };
        const headers:AxiosRequestHeaders = {
            'Content-Type': contentType,
        };
        let config = {
            headers,
        };
        return function(url: string, data?: any){
            if(method == 'GET'){
                let newParams = {...params, ...data};
                let axiosConfig: AxiosRequestConfig = {
                    ...config,
                    params: newParams,
                };
                return baseApiRequest.get(url, axiosConfig).then(result => result).catch(e => e.response);
            }

            let axiosConfig: AxiosRequestConfig = {
                ...config,
                params: params
            };
            return baseApiRequest.post(url, data? data : undefined, axiosConfig).then(result => {
                return result;
            }).catch(error => {
                return error.response;
            });
        }
    }
}