import { AppStyle } from "../../../common/AppStyle";
import { gray, white } from "../../../common/Colors";
import React from "react";
import { ScrollView, StatusBar, Text, View } from "react-native";
import CreatePostForm from "../forms/CreatePostForm";
interface CreatePostBasicLayoutInterface{
    onSendPost: Function,
    isLoad: boolean
}
export default function CreatePostBasicLayout(props: CreatePostBasicLayoutInterface){
    return <ScrollView showsVerticalScrollIndicator={false} style={[AppStyle.container, {paddingTop: 15, backgroundColor: white}]}>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />
        <CreatePostForm onSendPost={props.onSendPost} />
    </ScrollView>
}