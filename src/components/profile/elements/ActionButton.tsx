import React, { ReactNode } from "react";
import { Animated, TouchableOpacity, StyleSheet } from "react-native";
import { AppStyle } from "../../../common/AppStyle";
interface ActionButtonProps{
    children?: ReactNode | JSX.Element | JSX.Element[],
    onPress: Function,
    containerStyle?: any
};
const style = StyleSheet.create({
    actionButton: {height: 45, width: 45}
})
export default function ActionButton(props: ActionButtonProps){
    const touchAnimated = React.useRef(new Animated.Value(0)).current;
    function onPress(){
        Animated.sequence([
            Animated.timing(touchAnimated, {toValue: 1, duration: 150, useNativeDriver: true}),
            Animated.timing(touchAnimated, {toValue: 0, duration: 300, useNativeDriver: true})
        ]).start();
        props.onPress()
    }
    return <TouchableOpacity onPress={onPress} style={[style.actionButton, AppStyle.center, props.containerStyle]}>
        <Animated.View style={[{
            transform: [
                {
                    scale: touchAnimated.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.2]
                    })
                }
            ]
        }]}>
            { props.children }
        </Animated.View>
    </TouchableOpacity>
}