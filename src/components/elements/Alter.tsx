import React from "react";
import { Text, StyleSheet, Animated, Easing, TouchableOpacity } from "react-native";
import { AppStyle } from "@teiresource/commonconfig/AppStyle";
import { red, white } from "@teiresource/commonconfig/Colors";
const style = StyleSheet.create({
    from: {position: "absolute", bottom: 25},
    alterContainer: {
        position: 'absolute',
        top: 20,
        right: 15,
        zIndex: 2,
        backgroundColor: red,
        borderRadius: 5,
        shadowColor: red,
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 0.5,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    closeButton: {
        color: white,
        fontWeight: 'bold',
        fontSize: 18
    }
});
interface AlterProps{
    message: string | undefined,
    _id: string | number
}
export default function Alter(props: AlterProps){
    const fade = React.useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
        if(props._id){
            Animated.sequence([
                Animated.timing(fade, {toValue: 1, duration: 150, useNativeDriver: false}),
                Animated.timing(fade, {toValue: 0, duration: 8000, useNativeDriver: false, easing: Easing.exp})
            ]).start();
        }
    }, [props._id]);
    const closeAnimation = () => {
        Animated.timing(fade, {toValue: 0, useNativeDriver: true}).stop();
        fade.setValue(0);
    }
    return <Animated.View style={[style.alterContainer, {opacity: fade}, AppStyle.pt2, AppStyle.pb2, AppStyle.pr3, AppStyle.pl3]}>
        <Text style={[{color: white, marginRight: 5}]}>{props.message}</Text>
        <TouchableOpacity style={{paddingHorizontal: 5}} onPress={closeAnimation}>
            <Text style={style.closeButton}>x</Text>
        </TouchableOpacity>
    </Animated.View>
}