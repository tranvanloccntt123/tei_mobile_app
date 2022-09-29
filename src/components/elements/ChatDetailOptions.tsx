import React from "react";
import { View, Text, StyleSheet, Dimensions, Touchable } from "react-native";
import { AppStyle } from "../../common/AppStyle";
import { red, green, violet, gray, white, black, grayLightPrimary } from "../../common/Colors";
import ActionComponent from "./ActionComponent";
import Ionicons from "react-native-vector-icons/Ionicons"
import { LauchImage, CaptureImage } from "../../untils/CameraUntil";
import { Asset } from "react-native-image-picker";
const style = StyleSheet.create({
    titleAciton: {fontWeight: "bold", fontSize: 20, textAlign: "center"},
    div: {borderBottomColor: gray, borderBottomWidth: 1, paddingVertical: 5, paddingHorizontal: 10, marginBottom: 15},
    menuTitle: {fontSize: 18, color: violet}
})
const width = Dimensions.get("window").width;
interface ChatDetailOptionsProps{
    onSelectImage?: Function,
    onBefore?: Function
}
export default function ChatDetailOptions(props:ChatDetailOptionsProps){
    const selectImage = () => LauchImage(function(){
        if(props.onBefore) 
            props.onBefore()    
    }, function(result: Asset[]){
        if(props.onSelectImage){
            props.onSelectImage(result)
        }
    });
    const captureImage = () => CaptureImage(function(){
        if(props.onBefore) 
            props.onBefore()    
    }, function(result: Asset[]){
        if(props.onSelectImage){
            props.onSelectImage(result)
        }
    });
    return <View style={[AppStyle.p3]}>
        <Text style={[AppStyle.mb3, style.titleAciton]}>Mennu</Text>
        <View>
            <View style={[style.div]}>
                <Text style={style.menuTitle}>Actions</Text>
            </View>
            <View style={{flexDirection: "row", width: "100%"}}>
                <ActionComponent onPress={selectImage} icons={() => <Ionicons name="ios-image" color={white} size={width*0.09} />} />
                <ActionComponent onPress={captureImage} backgroundColor={red} icons={() => <Ionicons name="camera" color={white} size={width*0.09} />} />
           </View>
        </View>
    </View>
}