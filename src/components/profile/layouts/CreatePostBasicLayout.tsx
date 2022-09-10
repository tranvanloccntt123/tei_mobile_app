import { AppStyle } from "@teiresource/commonconfig/AppStyle";
import React from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import CreatePostForm from "../forms/CreatePostForm";
interface CreatePostBasicLayoutInterface{
    onSendPost: Function
}
export default function CreatePostBasicLayout(){
    return <View style={[AppStyle.container, {paddingTop: 15}]}>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />
        <SafeAreaView style={{flex: 1}}>
            <CreatePostForm />
        </SafeAreaView>
    </View>
}