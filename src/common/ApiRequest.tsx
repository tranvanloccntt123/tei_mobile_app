import axios, {AxiosRequestConfig, AxiosRequestHeaders, Method} from "axios";

export type ContentType = 'text/html' | 'multipart/form-data' | 'x-www-form-urlencoded' | 'application/json';
export class ApiRequest{
    static token: string
    static applicationId: string
    static build(method:Method = 'GET', contentType: ContentType = 'text/html'){
        const token = `Bearer ${ApiRequest.token}`;
        let params = {
            application_id: ApiRequest.applicationId
        };
        const headers:AxiosRequestHeaders = {
            'Authorization': token,
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
                return axios.get(url, axiosConfig).then(result => result).catch(e => e.response);
            }

            let axiosConfig: AxiosRequestConfig = {
                ...config,
                params: params
            };
            return axios.post(url, data? data : undefined, axiosConfig).then(result => {
                return result;
            }).catch(error => {
                return error.response;
            });
        }
    }
}