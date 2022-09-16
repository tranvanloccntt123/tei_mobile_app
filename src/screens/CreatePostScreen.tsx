import { sendPost } from "@teiresource/commonconfig/Until";
import React from "react";
import { View } from "react-native";
import CreatePostBasicLayout from "../components/profile/layouts/CreatePostBasicLayout";
export default function CreatePostScreen(){
    const [isLoad, setIsLoad] = React.useState<boolean>(false);
    const onSendPost = async (content: string, name?: string, type?: string, media?: string) => {
        setIsLoad(true);
        let r = await sendPost(content, name, type, media);
        setIsLoad(false);
    }
    return <CreatePostBasicLayout isLoad={isLoad} onSendPost={onSendPost} />
}