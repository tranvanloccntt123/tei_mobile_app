import { ApiRequest } from "../common/ApiRequest";
import { Authentication, CheckPass, CheckUser } from "../common/Until";
import { Command } from "./Command";
export interface LoginCommandParams{
    username: string,
    password: string
}
export class LoginCommand implements Command<LoginCommandParams>{
    context: any;
    pedding: boolean = false;
    constructor(context: any){
        this.context = context;
    }

    public canExecute(params: LoginCommandParams): boolean {
        let checkUser = CheckUser(params.username);
        let checkPass = CheckPass(params.password);
        if(checkUser) this.context.setErrorUserName("");
        else this.context.setErrorUserName("* User's length is 6 - 15");
        
        if(checkPass) this.context.setErrorPassword("");
        else this.context.setErrorPassword("* Pass's length is 6 - 15");

        if(!checkUser || !checkPass) return false;
        else return !this.pedding;
    }
    
    public async execute(params: LoginCommandParams): Promise<void> {
        this.pedding = true;
        let result = await Authentication(params.username, params.password);
        if(result != false){
            this.context.setAuth(true);
            ApiRequest.token = result.message.token;
        }
        this.pedding = false;
    }
}