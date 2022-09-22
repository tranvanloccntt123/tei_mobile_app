import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageSourcePropType, Animated } from "react-native";
import { AppStyle } from "../../../common/AppStyle";
import { black, gray, grayLightPrimary, red, violet, white } from "../../../common/Colors";
import { PostInterface, ProfileInterface } from "../../../common/AppInterface";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import ActionButton from "./ActionButton";
import FastImage from 'react-native-fast-image';
import { useSelector } from "react-redux";
import { COMBINE_NAME_PROFILE } from "../../../redux/reducers/CombineName";
const style = StyleSheet.create({
    container: {backgroundColor: white, paddingBottom: 25, paddingTop: 15, marginBottom: 15, shadowColor: gray, shadowOffset: {width: 0, height: 3}, shadowOpacity: 0.5, elevation: 5},
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
    const PostCardOpacity = React.useRef(new Animated.Value(1)).current;
    const avatar:ImageSourcePropType | undefined = props.data.user.avatar
    const [isLike, setIsLike] = React.useState<boolean>(false);
    const onPressToImage = () => {
        if(props.onPressToImage) props.onPressToImage(props.data);
    }
    const onPressInfo = () => {
        if(props.onPressInfo)
            props.onPressInfo();
    }
    return <Animated.View style={[style.container, {opacity: PostCardOpacity}]}>
        <View style={[{flexDirection: 'row'}]}>
            {
                avatar? <View style={[style.avatarContainer, AppStyle.center, AppStyle.ml3]}>
                    <FastImage source={avatar} style={{width: 50, height: 50, borderRadius: 30}} />
                </View> : null
            }
            <View style={[AppStyle.pl3]}>
                <Text style={[AppStyle.h5, AppStyle.mb1, {color: grayLightPrimary, fontWeight: 'bold'}]}>{props.data.user?.name}</Text>
                <Text style={[AppStyle.p, {color: black}]}>{props.data.created_at}</Text>
            </View>
            <View style={[{flex: 1, alignItems: "flex-end"}, AppStyle.mr3]}>
                {
                    profile && profile.id == props.data.user.id? <TouchableOpacity style={[AppStyle.p3]} onPress={onPressInfo} activeOpacity={0.8}>
                        <Feather name="more-vertical" size={18} color={violet} />
                    </TouchableOpacity> : null
                }
            </View>
        </View>
        <Text style={[AppStyle.p3]}>{props.data.content}</Text>
        {
            props.data.image? <TouchableOpacity activeOpacity={0.8} onPress={onPressToImage}>
                <FastImage source={{uri: props.data.image}} style={{width: '100%', height: 300}} />
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
    </Animated.View>
}