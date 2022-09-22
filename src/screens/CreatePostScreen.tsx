import { checkUUIDRegex, sendPost } from "../common/Until";
import React from "react";
import CreatePostForm from "../components/profile/forms/CreatePostForm";
import { ScrollView, StatusBar } from "react-native";
import { AppStyle } from "../common/AppStyle";
import { white } from "../common/Colors";
export default function CreatePostScreen(){
    const [visible, setVisible] = React.useState<boolean>(false);
    const onSendPost = async (content: string, name?: string, type?: string, media?: string) => {
        let r = await sendPost(content, name, type, media);
        if(!r) {
            return;
        }
    }
    return <ScrollView showsVerticalScrollIndicator={false} style={[AppStyle.container, {paddingTop: 15, backgroundColor: white}]}>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />
        <CreatePostForm onSendPost={onSendPost} />
    </ScrollView>
}