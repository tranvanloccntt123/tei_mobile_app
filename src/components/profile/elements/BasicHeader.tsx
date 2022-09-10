import React from "react";
import { View, Text, ImageBackground, Dimensions, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from "react-native";
import { AppStyle } from "@teiresource/commonconfig/AppStyle";
import { black, blue, gray, white } from "@teiresource/commonconfig/Colors";
import { DEV_BACKGROUND, AVATAR_DEFAULT } from "../../../assets/images";
import { UserInterface } from "@teiresource/commonconfig/AppInterface";
import { ProfileInterface } from "@teiresource/commonconfig/AppInterface";
const { width, height } = Dimensions.get('window');
const style = StyleSheet.create({
    backgroundContainer: {
        width: '100%',
        height: height * 0.6,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    backgroundOverlayContainer: {
        flex: 1,
        backgroundColor: black + 45
    },
    avatarContainer: { padding: 3, backgroundColor: white, borderRadius: width, marginBottom: 20 },
    avatar: { width: width * 0.3, height: width * 0.3, borderRadius: width },
    bottomDiv: { height: 50, backgroundColor: 'white', borderTopLeftRadius: 25, borderTopRightRadius: 25, position: 'absolute', bottom: 0, width: '100%',  zIndex: 2 },
    subBottomDiv: { height: 4, width: 60, backgroundColor: blue, marginTop: 2, alignItems: 'center' }
});
interface BasicHeaderProps{
    user: ProfileInterface,
    onPressAvatar?: Function
}
export default function BasicHeader(props: BasicHeaderProps){
    const [background, setbackground] = React.useState<ImageSourcePropType>(DEV_BACKGROUND);
    const [avatar, setAvatar] = React.useState<ImageSourcePropType>(AVATAR_DEFAULT);
    React.useEffect(() => {
        setbackground(props.user.background? props.user.background : DEV_BACKGROUND);
        setAvatar(props.user.avatar? props.user.avatar : AVATAR_DEFAULT)
    }, []);
    return <>
        <ImageBackground source={background} resizeMethod={'resize'} style={style.backgroundContainer}>
            <View style={style.backgroundOverlayContainer}>
                <View style={[{flex: 1}, AppStyle.center]}>
                    <View style={style.avatarContainer}>
                        <Image source={avatar} style={style.avatar} />
                    </View>
                    <Text style={[AppStyle.h2, { color: white, fontWeight: 'normal' }]}>{props.user.name}</Text>
                </View>
            </View>
        </ImageBackground>
    </>
}