import { sendPost, updatePost } from "../common/Until";
import { Alert, Keyboard } from "react-native";
import { Command } from "./Command";
import { CommandBuilder } from "./CommandBuilder";
import { Asset } from "react-native-image-picker";
export interface SendPostCommandParams{
    content: string,
    file: Asset | null,
    mode: boolean,
    uuid?: string
}
export class SendPostCommand extends CommandBuilder implements Command<SendPostCommandParams> {

    canExecute(params: SendPostCommandParams, callback?: Function | undefined): boolean {
        if (!params.content) return false;
        return true;
    }
    async execute(params: SendPostCommandParams, callback?: Function | undefined): Promise<void> {
        let r = null;
        if (params.mode) r = await sendPost(params.content, params.file?.fileName, params.file?.type, params.file?.uri);
        else r = await updatePost(params.uuid? params.uuid : "", params.content, params.file?.fileName, params.file?.type, params.file?.uri);
        await setTimeout(() => {  }, 1000);
        if (!r){
            if(this.rejectFunction)
                this.rejectFunction(r);
        }
        else {
            if(this.resolveFunction)
                this.resolveFunction(r);
        }
    }
}