import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { AVATAR_DEFAULT } from "../../assets/images";
import { ProfileInterface } from "../../common/AppInterface";
import { AppStyle } from "../../common/AppStyle";
import { black, grayPrimary, pink, white } from "../../common/Colors";
import { PROFILE_FIND_SCREEN, PROFILE_INFO_SCREEN } from "../../common/RouteName";
import AppLayout from "../../components/layouts/AppLayout";
import { COMBINE_NAME_PROFILE } from "../../redux/reducers/CombineName";
const { width, height } = Dimensions.get('window');
const style = StyleSheet.create({
    loveBoxContainer: {
        width: width - (width * 0.06),
        height: (width - (width * 0.06)) / 1.5,
        backgroundColor: pink,
        borderRadius: 30,
        shadowColor: pink,
        shadowOffset: { width: 3, height: 2 },
        shadowOpacity: 0.5,
        padding: 25
    },
    loveBoxAvatarContainer: {
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: width,
        backgroundColor: white,
        overflow: "hidden"
    }
});
export default function HomeLoveScreen() {
    const profile: ProfileInterface = useSelector((state: any) => state[`${COMBINE_NAME_PROFILE}`].user);
    const [profileLover, setProfileLover] = React.useState<ProfileInterface | null>(null);
    const navigation = useNavigation();
    const onOpenAndSelectLover = () => {
        if(profileLover) return;
        navigation.navigate(PROFILE_FIND_SCREEN as never);
    }
    return <AppLayout>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[{ flexDirection: "row" }, AppStyle.p3]}>
                <View style={{ flex: 1 }}>
                    <Text style={[AppStyle.h5, { color: grayPrimary }]}>Hello, </Text>
                    {
                        profile?.name ? <Text style={[AppStyle.h3, { color: black }]}>{profile.name}!</Text> : null
                    }
                </View>
            </View>
            <View style={[style.loveBoxContainer, AppStyle.m3]}>
                <View style={[{ flex: 1 }, AppStyle.center]}>
                    <Text style={[AppStyle.h1, { color: white, textAlign: "center" }]}>2000 days</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity onPress={() => navigation.navigate(PROFILE_INFO_SCREEN as never)} activeOpacity={0.8} style={{ flexDirection: "row" }}>
                        <View style={[style.loveBoxAvatarContainer, AppStyle.center]}>
                            <FastImage resizeMode="contain" style={{ width: "100%", height: "100%" }} source={profile?.avatar ? profile.avatar : AVATAR_DEFAULT} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity onPress={onOpenAndSelectLover} activeOpacity={0.8} style={{ flexDirection: "row" }}>
                        <View style={[style.loveBoxAvatarContainer, AppStyle.center]}>
                            <Text style={{ fontSize: 35 }}>+</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 1 }} />
                </View>
            </View>
        </ScrollView>
    </AppLayout>
}