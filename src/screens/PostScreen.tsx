import React from "react";
import { ScrollView, View, TouchableOpacity, TextInput, StyleSheet, Dimensions, Image, TouchableWithoutFeedback, Keyboard, Text } from "react-native";
import { AppStyle } from "../common/AppStyle";
import { black, blue, gray, violet, white } from "../common/Colors";
import { useNavigation } from "@react-navigation/native";
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppLayout from "../components/layouts/AppLayout";
import ActionButton from "../components/elements/ActionButton";
import { ScreenInterface } from "../common/AppInterface";
import { stateManagement, useMode, useSelectImage, useSendPost } from "../sevices/PostServices";
import FastImage from "react-native-fast-image";
import { STOREAGE } from "../common/ApiRoute";
const { width, height } = Dimensions.get('window');
const style = StyleSheet.create({
    container: {},
    inputContainer: { width: '100%', height: height * 0.8, backgroundColor: white, borderRadius: 15 },
    input: { flex: 1, paddingHorizontal: 15, paddingVertical: 10 },
    bottomInput: { borderTopWidth: 1, borderTopColor: gray, flexDirection: 'row', paddingTop: 5, paddingHorizontal: 15, paddingBottom: 10 },
    iconButtonContainer: { borderWidth: 1, borderRadius: 40, width: 40, height: 40, marginRight: 5, shadowColor: gray, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, elevation: 5 },
    sendButtonContainer: { height: 30, backgroundColor: blue, borderRadius: 5, paddingHorizontal: 8 },
    fileContainer: { margin: 15, width: 150, height: 150, borderRadius: 15, elevation: 5, shadowColor: black, shadowOffset: { width: 3, height: 3 }, shadowOpacity: 0.5 },
    fileThumbContainer: { margin: 15, width: 75, height: 75, borderRadius: 15, elevation: 5, shadowColor: black, shadowOffset: { width: 3, height: 3 }, shadowOpacity: 0.25 },
    fileCloseContainer: { position: 'absolute', zIndex: 3, top: -7.5, right: -7.5, backgroundColor: gray, padding: 5, borderRadius: 30 },
    fileViewImage: { width: '100%', height: '100%', borderRadius: 15 },
    sendingImage: { width: '100%', height: '100%', borderRadius: 15 },
    sendingViewOverlay: {position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: white+85}
});
export default function CreatePostScreen(this: any, props: ScreenInterface) {
    const navigation = useNavigation();
    stateManagement.call(this, props.route);
    useMode.call(this);
    const onSelectImage = () => useSelectImage.call(this);
    const onSendPost = () => useSendPost.call(this);
    const FileView = React.useCallback(() => {
        return this.file ? <View style={[style.fileContainer, AppStyle.mt3]}>
            <TouchableOpacity onPress={() => this.setFile(null)} activeOpacity={0.8} style={style.fileCloseContainer}>
                <AntDesign name="close" size={18} />
            </TouchableOpacity>
            <FastImage source={{ uri: this.file.uri }} style={style.fileViewImage} />
        </View> : null
    }, [this.file]);
    const OldFileView = React.useCallback(() => {
        return !this.file && this.oldImage ? <View style={[style.fileContainer, AppStyle.mt3]}>
            <FastImage source={{ uri: this.oldImage }} style={style.fileViewImage} />
        </View> : null
    }, [this.file, this.oldImage]);
    const SenddingView = () => <View>
        <View style={{ flexDirection: "row" }}>
            {
                this.file ? <View style={[style.fileThumbContainer, AppStyle.mt3]}>
                    <Image source={{ uri: this.file.uri }} style={style.sendingImage} />
                </View> : null
            }
            <Text style={{ flex: 1 }}>{this.content}</Text>
        </View>
        <View style={[style.sendingViewOverlay, AppStyle.center]}>
            <Text style={{color: black, paddingVertical: 5, paddingHorizontal: 10, backgroundColor: white}}>Sending...</Text>
        </View>
    </View>
    return <AppLayout>
        <View style={[{ flexDirection: "row", padding: 15 }, AppStyle.center]}>
            <TouchableOpacity style={{ padding: 8 }} onPress={() => navigation.goBack()}>
                <AntDesign name='left' size={18} />
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <ActionButton containerStyle={[style.iconButtonContainer, { backgroundColor: violet, borderWidth: 0 }]} onPress={onSelectImage}>
                <Feather name="image" size={20} color={white} />
            </ActionButton>
            <ActionButton containerStyle={[style.iconButtonContainer, { backgroundColor: blue, borderWidth: 0 }]} onPress={onSendPost}>
                <Feather name="check" size={20} color={white} />
            </ActionButton>
        </View>
        <ScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false}>
            {
                this.visible ? SenddingView() : <>
                    <View style={[AppStyle.center]}>
                        { OldFileView() }   
                        { FileView() }
                    </View>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <View style={[style.inputContainer]}>
                            <TextInput placeholder="what do you think about ... ?" style={[style.input]} textAlign='left' value={this.content} onChangeText={(text) => this.setContent(text)} multiline />
                        </View>
                    </TouchableWithoutFeedback>
                </>
            }
        </ScrollView>

    </AppLayout>
}