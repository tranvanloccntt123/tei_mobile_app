import { AppStyle } from "@teiresource/commonconfig/AppStyle";
import { blue, gray, violet, white } from "@teiresource/commonconfig/Colors";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AntDesign from 'react-native-vector-icons/AntDesign';
const style = StyleSheet.create({
    container: {},
    inputContainer: { width: '100%', height: 200, borderWidth: 1, borderColor: gray, backgroundColor: white, borderRadius: 15},
    input: {flex: 1, paddingHorizontal: 15, paddingVertical: 10},
    bottomInput: { borderTopWidth: 1, borderTopColor: gray, flexDirection: 'row', paddingTop: 5, paddingHorizontal: 15, paddingBottom: 10 },
    iconButtonContainer: {width: 30, height: 30, marginRight: 5},
    sendButtonContainer: {height: 30, backgroundColor: blue, borderRadius: 5, paddingHorizontal: 8}
})
export default function CreatePostForm(){
    const [content, setContent] = React.useState("")
    return <View style={[style.container, AppStyle.p3]}>
        <Text style={[AppStyle.h3, AppStyle.ml2, AppStyle.mr2, AppStyle.mb3]}>POST</Text>
        <View style={[style.inputContainer]}>
            <TextInput style={[style.input]} textAlign='left' value={content} onChangeText={(text) => setContent(text)}  multiline  />
            <View style={[style.bottomInput]}>
                <View style={{flex: 1}}></View>
                <TouchableOpacity activeOpacity={0.8} style={[style.iconButtonContainer, AppStyle.center]}>
                    <AntDesign name="paperclip" size={15} color={violet} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={[style.sendButtonContainer, AppStyle.center]}>
                    <Text style={{color: white}}>Create</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
}