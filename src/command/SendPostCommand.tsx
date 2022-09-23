import { sendPost, updatePost } from "../common/Until";
import { Alert, Keyboard } from "react-native";
import { Command } from "./Command";
export class SendPostCommand implements Command{
    context: any
    constructor(context: any){
        this.context = context
    }
    canExecute(params?: any, callback?: Function | undefined): boolean {
        if(!this.context.content) return false;
        return true;
    }
    async execute(params?: any, callback?: Function | undefined): Promise<void> {
        Keyboard.dismiss();
        this.context.setVisible(true);
        let r = null;
        if (this.context.mode) r = await sendPost(this.context.content, this.context.file?.fileName, this.context.file?.type, this.context.file?.uri);
        else r = await updatePost(this.context.uuid, this.context.content, this.context.file?.fileName, this.context.file?.type, this.context.file?.uri);
        await setTimeout(() => {}, 1000);
        this.context.setVisible(false);
        if (!r) {
            Alert.alert("FAIL", `${this.context.modeTitle} post fail!`, [{ text: "OK", style: "cancel" }, { text: "Retry", style: "destructive" }]);
        } else {
            Alert.alert("SUCCESS", `${this.context.modeTitle} post success!`, [{ text: "OK", style: "cancel" }]);
            if(this.context.mode){
                this.context.setContent("");
            } 
            else 
            {
                if(this.context.file) this.context.setOldImage(this.context.file.uri);
            }
            this.context.setFile(null);
        }
    }
}