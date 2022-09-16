import { AppStyle } from "@teiresource/commonconfig/AppStyle";
import { black, blue, gray, violet, white } from "@teiresource/commonconfig/Colors";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Asset } from 'react-native-image-picker';
import { LauchImage } from "../../../untils/CameraUntil";
import { sendPost } from "@teiresource/commonconfig/Until";
const {width, height} = Dimensions.get('window');
const style = StyleSheet.create({
    container: {},
    inputContainer: { width: '100%', height: height * 0.8, backgroundColor: white, borderRadius: 15 },
    input: { flex: 1, paddingHorizontal: 15, paddingVertical: 10 },
    bottomInput: { borderTopWidth: 1, borderTopColor: gray, flexDirection: 'row', paddingTop: 5, paddingHorizontal: 15, paddingBottom: 10 },
    iconButtonContainer: { width: 30, height: 30, marginRight: 5 },
    sendButtonContainer: { height: 30, backgroundColor: blue, borderRadius: 5, paddingHorizontal: 8 },
    fileContainer: { marginBottom: 50, width: width * 0.9, height: width * 0.9, borderRadius: 15, alignSelf: "center", elevation: 5, shadowColor: black, shadowOffset: {width: 3, height: 3}, shadowOpacity: 0.5 },
    fileCloseContainer: {position: 'absolute', zIndex: 3, top: -7.5, right: -7.5, backgroundColor: gray, padding: 5, borderRadius: 30}
});
interface CreatePostFormProps{
    onSendPost: Function
}
export default function CreatePostForm(props: CreatePostFormProps) {
    const [content, setContent] = React.useState("");
    const [file, setFile] = React.useState<Asset | null>(null);
    const onSelectImage = () => LauchImage(function () {
    }, function (result: Asset[]) {
        if (result[0])
            setFile(result[0]);
    });
    const onSendPost = () => {
        props.onSendPost(content, file?.fileName, file?.type, file?.uri);
    }
    const FileView = React.useCallback(() => {
        return file ? <View style={[style.fileContainer, AppStyle.mt3]}>
            <TouchableOpacity onPress={() => setFile(null)} activeOpacity={0.8} style={style.fileCloseContainer}>
                <AntDesign name="close" size={18} />
            </TouchableOpacity>
            <Image source={{ uri: file.uri }} style={{ width: '100%', height: '100%', borderRadius: 15 }} />
        </View> : null
    }, [file]);
    return <View style={[style.container, AppStyle.p3]}>
        <View style={[style.inputContainer]}>
            <TextInput placeholder="what do you think about ... ?" style={[style.input]} textAlign='left' value={content} onChangeText={(text) => setContent(text)} multiline />
            <View style={[style.bottomInput]}>
                <View style={{ flex: 1 }}>
                </View>
                <TouchableOpacity onPress={onSelectImage} activeOpacity={0.8} style={[style.iconButtonContainer, AppStyle.center]}>
                    <AntDesign name="paperclip" size={15} color={violet} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onSendPost} activeOpacity={0.8} style={[style.sendButtonContainer, AppStyle.center]}>
                    <Text style={{ color: white }}>Create</Text>
                </TouchableOpacity>
            </View>
        </View>
        {
            FileView()
        }
    </View>
}