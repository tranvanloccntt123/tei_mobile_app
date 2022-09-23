import React from "react";
import { View, StyleSheet, Text, TextInput, TextInputProps } from "react-native";
import { AppStyle } from "../../common/AppStyle";
import { black, gray, grayPrimary, red, violet, white } from "../../common/Colors";
interface InputProps extends TextInputProps{
    label: string, 
    containerStyle?: any,
    labelStyle?: any,
    inputStyle?: any,
    error?: string
}
const style = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: white,
        borderWidth: 1,
        borderColor: gray,
        borderRadius: 15,
        height: 55,
        marginBottom: 35
    },
    label: {backgroundColor: white, position: 'absolute', top: -12, left: 15, paddingHorizontal: 5, color: grayPrimary},
    input: {width: '100%', height: '100%', backgroundColor: 'transparent'},
    error: {
        color: red,
        marginLeft: 8,
        marginTop: 3
    }
});
const defaultProps: InputProps = {
    label: "Input"
}
export default function Input(props: InputProps = defaultProps){
    const {label, containerStyle, labelStyle, inputStyle} = props;
    return <View style={[style.container, containerStyle? containerStyle : null]}>
        <Text style={[style.label, AppStyle.h5, labelStyle? labelStyle : null]}>{label}</Text>
        <TextInput {...props} style={[style.input, AppStyle.pl3, AppStyle.pr3, inputStyle? inputStyle : null]} />
        {
            props.error? <Text style={[style.error]}>{props.error}</Text> : null
        }
    </View>
}