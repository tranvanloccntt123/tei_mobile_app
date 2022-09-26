import { useDispatch } from "react-redux";
import { ProfileInterface } from "../common/AppInterface";
import { updateProfile } from "../common/Until";
import { PROFILE_ACTION_SET_USER } from "../redux/actions/ProfileAction";
import { Command } from "./Command";

export class SaveProfileCommand implements Command{

    context: any

    pending: boolean = false;

    dispatch: any

    constructor(context: any){
        this.context = context;
        this.pending = false;
        this.dispatch = useDispatch();
    }

    reject(callback?: Function | undefined) {
        this.context.setAlterStatus(0);
        this.context.setAlter("update profile fail");
        this.context.setAlterId(this.context.alterId + 1);
    }

    resolve(params?: any, callback?: Function | undefined) {
        this.dispatch({type: PROFILE_ACTION_SET_USER, user: params});
        this.context.setAlterStatus(1);
        this.context.setAlter("Profile updated");
        this.context.setAlterId(this.context.alterId + 1);
    }

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
        if(result) this.resolve(result);
        else this.reject();
    }
}