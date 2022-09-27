import { useDispatch } from "react-redux";
import { ProfileInterface } from "../common/AppInterface";
import { updateProfile } from "../common/Until";
import { PROFILE_ACTION_SET_USER } from "../redux/actions/ProfileAction";
import { Command } from "./Command";
import { CommandBuilder } from "./CommandBuilder";

export class SaveProfileCommand extends CommandBuilder implements Command{

    pending: boolean = false;

    canExecute(params: ProfileInterface, callback?: Function | undefined): boolean {
        if(!params.name) this.context.setErrorName("* Name isn't empty");
        else this.context.setErrorName("");

        if(!params.email) this.context.setErrorEmail("* Email isn't empty");
        else this.context.setErrorEmail("");

        if(!params.description) this.context.setErrorDescription("* Description isn't empty");
        else this.context.setErrorDescription("");

        if(!params.name || !params.email || !params.description) return false;
        return !this.pending;
    }

    async execute(params: ProfileInterface, callback?: Function | undefined): Promise<void> {
        this.pending = true;
        let result = await updateProfile(params);
        if(result) this.resolveFunction(result);
        else this.rejectFunction(result);
    }
}