import React from "react";
import { View, Text, ImageBackground, Dimensions, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from "react-native";
import { AppStyle } from "../../../common/AppStyle";
import { black, blue, gray, white } from "../../../common/Colors";
import { DEV_BACKGROUND, AVATAR_DEFAULT } from "../../../assets/images";
import { ProfileInterface } from "../../../common/AppInterface";
const { width, height } = Dimensions.get('window');
const style = StyleSheet.create({
    backgroundContainer: {
        width: '100%',
        height: height * 0.8,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    backgroundOverlayContainer: {
        flex: 1,
        backgroundColor: black + 45
    },
    bottomDiv: { height: 50, backgroundColor: 'white', borderTopLeftRadius: 25, borderTopRightRadius: 25, position: 'absolute', bottom: 0, width: '100%',  zIndex: 2 },
    subBottomDiv: { height: 4, width: 60, backgroundColor: blue, marginTop: 2, alignItems: 'center' }
});
interface BasicHeaderProps{
    user: ProfileInterface,
    onPressAvatar?: Function
}
export default function BasicBackgroundHeader(props: BasicHeaderProps){
    const [background, setbackground] = React.useState<ImageSourcePropType>(DEV_BACKGROUND);
    React.useEffect(() => {
        setbackground(props.user.background? props.user.background : DEV_BACKGROUND);
    }, []);
    return <>
        <ImageBackground source={background} resizeMethod={'resize'} style={style.backgroundContainer}>
            <View style={style.backgroundOverlayContainer}>
                
            </View>
        </ImageBackground>
    </>
}