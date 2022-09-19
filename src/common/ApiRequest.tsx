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
                if (error.response) {
                    console.log('ERROR RESPONSE');
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                  } else if (error.request) {
                    console.log('ERROR REQUEST');
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                  }
                  console.log(error.config);
                return error.response;
            });
        }
    }
}