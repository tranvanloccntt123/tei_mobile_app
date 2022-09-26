import React, { ReactNode } from "react";
import { TouchableOpacity, View, Text, TouchableOpacityProps, StyleSheet } from "react-native";
import { AppStyle } from "../../common/AppStyle";
import { blackPrimary, blue, orange, white } from "../../common/Colors";
interface ButtonProps extends TouchableOpacityProps{
    label: string,
    containerStyle?: any,
    labelStyle?: any,
    buttonStyle?: any,
    childrenLeft?: ReactNode | JSX.Element | JSX.Element[],
}
const style = StyleSheet.create({
    container: {
        width: '100%'
    },
    button: {
        backgroundColor: blue,
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
            <View style={{flexDirection: "row"}}>
                <Text style={[style.label, AppStyle.h5, labelStyle]}>{label}</Text>
                {
                    props.childrenLeft
                }
            </View>
        </TouchableOpacity>
    </View>
}