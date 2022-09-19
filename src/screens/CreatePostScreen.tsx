import { checkUUIDRegex, sendPost } from "../common/Until";
import React from "react";
import CreatePostBasicLayout from "../components/profile/layouts/CreatePostBasicLayout";
import { Alert } from "react-native";
export default function CreatePostScreen(){
    const [isLoad, setIsLoad] = React.useState<boolean>(false);
    const [message, setMessage] = React.useState<string>("");
    const onSendPost = async (content: string, name?: string, type?: string, media?: string) => {
        setIsLoad(true);
        let r = await sendPost(content, name, type, media);
        setIsLoad(false);
        if(!r) {
            return;
        }
        setMessage(checkUUIDRegex(r)? "Uploaded successfully" : "Upload failed");
    }
    return <CreatePostBasicLayout isLoad={isLoad} onSendPost={onSendPost} />
}