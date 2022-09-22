import React, { ReactNode } from "react";
import { Text, StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import { AVATAR_DEFAULT } from "../../../assets/images";
import { ProfileInterface } from "../../../common/AppInterface";
import { AppStyle } from "../../../common/AppStyle";
import { blue, gray, orange, violet, white } from "../../../common/Colors";
interface PropsInterface {
    children?: ReactNode | JSX.Element | JSX.Element[],
    current: ProfileInterface,
    countPost: number, 
    countFriend: number,
}
const style = StyleSheet.create({
    container: { backgroundColor: white, marginBottom: 25, elevation: 15, shadowColor: gray, shadowOpacity: 0.5, shadowOffset: { width: 5, height: 5 } },
    profileContainer: { flexDirection: "row", marginBottom: 15, marginTop: 15 },
    avatarContainer: { borderWidth: 2, borderColor: blue, padding: 5, width: 100, height: 100, borderRadius: 80 }
})
export default function BasicProfile(props: PropsInterface) {
    return <View style={[AppStyle.p3, style.container]}>
        <View style={[AppStyle.m3, AppStyle.center]}>
            <View style={style.avatarContainer}>
                <FastImage resizeMode="contain" style={{ width: "100%", height: "100%", borderRadius: 80 }} source={AVATAR_DEFAULT} />
            </View>
            <View style={[AppStyle.p3]}>
                <Text style={[AppStyle.h5, { fontWeight: "bold", textAlign: "center" }]}>{props.current ? props.current.name : ""}</Text>
                <Text style={[AppStyle.p, { color: gray, textAlign: "center" }]}>tranvanloccntt123@gmail.com</Text>
                <Text style={[AppStyle.p, { color: gray, textAlign: "center" }]}>Mobile develop</Text>
            </View>
        </View>
        {
            props?.children
        }
        <View style={style.profileContainer}>
            <View style={[{ flex: 1, borderRightWidth: 1, borderRightColor: violet+65 }, AppStyle.center]}>
                <Text style={[AppStyle.h3, { color: orange }]}>{props.countFriend}</Text>
                <Text>Friends</Text>
            </View>
            <View style={[{ flex: 1 }, AppStyle.center]}>
                <Text style={[AppStyle.h3, { color: orange }]}>0</Text>
                <Text>Images</Text>
            </View>
            <View style={[{ flex: 1, borderLeftWidth: 1, borderLeftColor: violet+65  }, AppStyle.center]}>
                <Text style={[AppStyle.h3, { color: orange }]}>{props.countPost}</Text>
                <Text>Posts</Text>
            </View>
        </View>
    </View>
}