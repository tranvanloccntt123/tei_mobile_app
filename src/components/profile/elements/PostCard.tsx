import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageSourcePropType } from "react-native";
import { AppStyle } from "@teiresource/commonconfig/AppStyle";
import { black, blue, brown, gray, grayLightPrimary, grayLightPrimary2, grayPrimary, red, violet, white } from "@teiresource/commonconfig/Colors";
import { DEV_BACKGROUND } from "../../../assets/images";
import { PostInterface } from "@teiresource/commonconfig/AppInterface";
import AntDesign from 'react-native-vector-icons/AntDesign'
import ActionButton from "./ActionButton";
const style = StyleSheet.create({
    avatarContainer: {backgroundColor: white, width: 60, height: 60, borderRadius: 50, shadowColor: grayLightPrimary, shadowOffset: {width: 3, height: 3}, shadowOpacity: 0.3, elevation: 3},
    commentButton: {flex: 1, height: 45, borderRadius: 30, backgroundColor: gray, justifyContent: 'center', paddingHorizontal: 15},
    actionButton: {height: 45, width: 45}
});
interface PostCardProps{
    data: PostInterface,
    index: number,
    onPressToImage?: Function
}
export default function PostCard(props: PostCardProps){
    const avatar:ImageSourcePropType = props.data.user.avatar
    const [isLike, setIsLike] = React.useState<boolean>(false);
    const onPressToImage = () => {
        if(props.onPressToImage) props.onPressToImage(props.data);
    }
    return <View style={[{backgroundColor: white, paddingBottom: 25, paddingTop: 15}]}>
        <View style={[{flexDirection: 'row'}, AppStyle.mb1]}>
            <View style={[style.avatarContainer, AppStyle.center, AppStyle.ml3]}>
                <Image source={avatar} style={{width: 50, height: 50, borderRadius: 30}} />
            </View>
            <View style={[AppStyle.pl3]}>
                <Text style={[AppStyle.h5, AppStyle.mb1, {color: grayLightPrimary, fontWeight: 'bold'}]}>{props.data.user?.name}</Text>
                <Text style={[AppStyle.p, {color: black}]}>{props.data.created_at}</Text>
            </View>
        </View>
        <Text style={[AppStyle.p3]}>{props.data.content}</Text>
        {
            props.data.image? <TouchableOpacity activeOpacity={0.8} onPress={onPressToImage}>
                <Image source={DEV_BACKGROUND} style={{width: '100%', height: 300, resizeMode: 'center'}} />
            </TouchableOpacity> : null
        }
        
        <View style={[AppStyle.p2, {flexDirection: 'row'}]}>
            <TouchableOpacity activeOpacity={0.9} style={[style.commentButton]}>
                <Text style={{fontSize: 16, color: black}}>Write comment...</Text>
            </TouchableOpacity>
            <ActionButton onPress={() => setIsLike(!isLike)}>
                <AntDesign name={isLike? 'heart' : 'hearto'} color={isLike? red : black} size={25} />
            </ActionButton>
        </View>
    </View>
}