import React from "react";
import { TouchableOpacity, View, Text, TouchableOpacityProps, StyleSheet } from "react-native";
import { AppStyle } from "../../common/AppStyle";
import { blackPrimary, blue, orange, white } from "../../common/Colors";
interface ButtonProps extends TouchableOpacityProps{
    label: string,
    containerStyle?: any,
    labelStyle?: any,
    buttonStyle?: any
}
const style = StyleSheet.create({
    container: {
        width: '100%'
    },
    button: {
        backgroundColor: orange,
        borderRadius: 15,
        shadowColor: blackPrimary,
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.3,
        elevation: 5
    },
    label: {
        color: white
    }
})
export default function Button(props: ButtonProps){
    const {label, containerStyle, labelStyle, buttonStyle} = props;
    return <View style={[style.container, containerStyle]}>
        <TouchableOpacity activeOpacity={0.9} style={[style.button, AppStyle.p4, AppStyle.center, buttonStyle]} {...props} >
            <Text style={[style.label, AppStyle.h5, labelStyle]}>{label}</Text>
        </TouchableOpacity>
    </View>
}