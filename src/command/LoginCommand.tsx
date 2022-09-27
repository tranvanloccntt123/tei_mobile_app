import { ApiRequest } from "../common/ApiRequest";
import { Authentication, CheckPass, CheckUser } from "../common/Until";
import { saveToken } from "../untils/AuthUntils";
import { Command } from "./Command";
import { CommandBuilder } from "./CommandBuilder";
export interface LoginCommandParams{
    username: string,
    password: string
}
export class LoginCommand extends CommandBuilder implements Command<LoginCommandParams>{
    pedding: boolean = false;

    canExecute(params: LoginCommandParams): boolean {
        let checkUser = CheckUser(params.username);
        let checkPass = CheckPass(params.password);
        if(this.context.setErrorUserName)
        {
            if(checkUser) this.context.setErrorUserName("");
            else this.context.setErrorUserName("* User's length is 6 - 15");
        }

        if(this.context.setErrorPassword){
            if(checkPass) this.context.setErrorPassword("");
            else this.context.setErrorPassword("* Pass's length is 6 - 15");
        }

        if(!checkUser || !checkPass) return false;
        else return !this.pedding;
    }
    
    async execute(params: LoginCommandParams): Promise<void> {
        this.pedding = true;
        let result = await Authentication(params.username, params.password);
        if(!result) this.rejectFunction();
        else await this.resolveFunction(result.message.token);
        this.pedding = false;
    }
}