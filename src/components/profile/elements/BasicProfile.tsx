import React, { ReactNode } from "react";
import { Text, StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import { AVATAR_DEFAULT } from "../../../assets/images";
import { ProfileInterface } from "../../../common/AppInterface";
import { AppStyle } from "../../../common/AppStyle";
import { blue, gray, orange, white } from "../../../common/Colors";
interface PropsInterface{
    children?: ReactNode | JSX.Element | JSX.Element[],
    current: ProfileInterface
}
const style = StyleSheet.create({
    container: {backgroundColor: white, marginBottom: 25, elevation: 15, shadowColor: gray, shadowOpacity: 0.5, shadowOffset: {width: 5, height: 5}},
    profileContainer: {flexDirection: "row", marginBottom: 15},
    avatarContainer: {borderWidth: 2, borderColor: blue, padding: 5, width: 100, height: 100, borderRadius: 80}
})
export default function BasicProfile(props: PropsInterface){
    return <View style={[AppStyle.p3, style.container]}>
        <View style={[style.profileContainer]}>
            <View style={style.avatarContainer}>
                <FastImage resizeMode="contain" style={{width: "100%", height: "100%", borderRadius: 80}} source={AVATAR_DEFAULT} />
            </View>
            <View style={[AppStyle.p3]}>
                <Text style={[AppStyle.h5, {fontWeight: "bold"}]}>{props.current? props.current.name : ""}</Text>
                <Text style={[AppStyle.p, {color: gray}]}>tranvanloccntt123@gmail.com</Text>
                <Text style={[AppStyle.p, {color: gray}]}>Mobile develop</Text>
            </View>
        </View>
        <View style={style.profileContainer}>
            <View style={[{flex: 1}, AppStyle.center]}>
                <Text style={[AppStyle.h3, {color: orange}]}>0</Text>
                <Text>Friends</Text>
            </View>
            {
                props?.children
            }
            <View style={[{flex: 1}, AppStyle.center]}>
                <Text style={[AppStyle.h3, {color: orange}]}>0</Text>
                <Text>Posts</Text>
            </View>
        </View>
    </View>
}