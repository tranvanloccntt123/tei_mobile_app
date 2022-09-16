import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageSourcePropType } from "react-native";
import { AppStyle } from "@teiresource/commonconfig/AppStyle";
import { black, blue, brown, gray, grayLightPrimary, grayLightPrimary2, grayPrimary, red, violet, white } from "@teiresource/commonconfig/Colors";
import { PostInterface, ProfileInterface } from "@teiresource/commonconfig/AppInterface";
import AntDesign from 'react-native-vector-icons/AntDesign'
import ActionButton from "./ActionButton";
import FastImage from 'react-native-fast-image';
import { useSelector } from "react-redux";
import { COMBINE_NAME_PROFILE } from "../../../redux/reducers/CombineName";
const style = StyleSheet.create({
    avatarContainer: {backgroundColor: white, width: 60, height: 60, borderRadius: 50, shadowColor: grayLightPrimary, shadowOffset: {width: 3, height: 3}, shadowOpacity: 0.3, elevation: 3},
    commentButton: {flex: 1, height: 45, borderRadius: 30, backgroundColor: gray, justifyContent: 'center', paddingHorizontal: 15},
    actionButton: {height: 45, width: 45}
});
interface PostCardProps{
    data: PostInterface,
    index: number,
    onPressToImage?: Function,
    onPressInfo?: Function
}
export default function PostCard(props: PostCardProps){
    const profile: ProfileInterface = useSelector((state: any) => state[`${COMBINE_NAME_PROFILE}`].user);
    const avatar:ImageSourcePropType = props.data.user.avatar
    const [isLike, setIsLike] = React.useState<boolean>(false);
    const onPressToImage = () => {
        if(props.onPressToImage) props.onPressToImage(props.data);
    }
    const onPressInfo = () => {
        if(props.onPressInfo)
            props.onPressInfo();
    }
    return <View style={[{backgroundColor: white, paddingBottom: 25, paddingTop: 15}]}>
        <View style={[{flexDirection: 'row'}]}>
            <View style={[style.avatarContainer, AppStyle.center, AppStyle.ml3]}>
                <FastImage source={avatar} style={{width: 50, height: 50, borderRadius: 30}} />
            </View>
            <View style={[AppStyle.pl3]}>
                <Text style={[AppStyle.h5, AppStyle.mb1, {color: grayLightPrimary, fontWeight: 'bold'}]}>{props.data.user?.name}</Text>
                <Text style={[AppStyle.p, {color: black}]}>{props.data.created_at}</Text>
            </View>
            <View style={[{flex: 1, alignItems: "flex-end"}, AppStyle.mr3]}>
                {
                    profile.id == props.data.user.id? <TouchableOpacity onPress={onPressInfo} activeOpacity={0.8}>
                        <AntDesign name="infocirlceo" size={18} color={violet} />
                    </TouchableOpacity> : null
                }
            </View>
        </View>
        <Text style={[AppStyle.p3]}>{props.data.content}</Text>
        {
            props.data.image? <TouchableOpacity activeOpacity={0.8} onPress={onPressToImage}>
                <FastImage source={{uri: props.data.image}} style={{width: '100%', height: 300, resizeMode: 'center'}} />
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