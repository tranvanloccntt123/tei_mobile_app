import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ColorValue } from "react-native";
import { black, blue } from "../../common/Colors";
const width = Dimensions.get("window").width
const boxSize = (width - (width * 0.03) * 2) / 4
interface ActionComponentProps{
    icons?: Function,
    backgroundColor?: ColorValue,
    onPress?: Function
}
const style = StyleSheet.create({
    container: {width: boxSize, height: boxSize, padding: 10},
    buttonContainer: {width: boxSize - 20, height: boxSize - 20, borderRadius: boxSize, shadowColor: black, shadowOffset: {width: 2, height: 2}, shadowOpacity: 0.5, elevation: 2, justifyContent: "center", alignItems: "center"}
})
export default function ActionComponent(props: ActionComponentProps){
    const onPress = () => {
        if(props.onPress) props.onPress()
    }
    return <View style={style.container}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={[style.buttonContainer, {backgroundColor: props.backgroundColor? props.backgroundColor : blue}]}>
            {
                props.icons? props.icons() : null
            }
        </TouchableOpacity>
    </View>
}