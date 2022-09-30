import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { AVATAR_DEFAULT } from "../../assets/images";
import { ProfileInterface } from "../../common/AppInterface";
import { AppStyle } from "../../common/AppStyle";
import { black, blue, grayPrimary, pink, red, white } from "../../common/Colors";
import { CHAT_DETAIL_SCREEN, PROFILE_FIND_SCREEN, PROFILE_INFO_SCREEN } from "../../common/RouteName";
import { getOrCreateRoomMessage } from "../../common/Until";
import AppLayout from "../../components/layouts/AppLayout";
import { COMBINE_NAME_PROFILE } from "../../redux/reducers/CombineName";
import { stateManagement } from "../../sevices/HomeLoverServices";
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
    },
    eventBoxContainer: {
        width: width * 0.4, 
        height: width * 0.4,
    }
});
export default function HomeLoveScreen(this: any) {
    const profile: ProfileInterface = useSelector((state: any) => state[`${COMBINE_NAME_PROFILE}`].user);
    stateManagement.call(this);
    const navigation = useNavigation();
    const onOpenAndSelectLover = () => {
        if(this.loadProfile) return;
        if(this.profileLover) {
            navigation.navigate(PROFILE_INFO_SCREEN as never, {visit: true, id: this.profileLover.id} as never)
            return;
        }
        navigation.navigate(PROFILE_FIND_SCREEN as never);
    }
    const onOpenMessage = async () => {
        if(this.loadProfile) return;
        let result = await getOrCreateRoomMessage(this.profileLover.id);
        navigation.navigate(CHAT_DETAIL_SCREEN as never, {item: {...result, name: this.profileLover.name}} as never);
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
                    <Text style={[AppStyle.h3, { color: white, textAlign: "center" }]}>Love <Text style={AppStyle.h1}>{this.countDay}</Text> days</Text>
                </View>
                <View style={[{ flexDirection: "row" }, AppStyle.ml3, AppStyle.mr3]}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate(PROFILE_INFO_SCREEN as never)} activeOpacity={0.8} style={{ flexDirection: "row", marginBottom: 15 }}>
                            <View style={[style.loveBoxAvatarContainer, AppStyle.center]}>
                                <FastImage resizeMode="contain" style={{ width: "100%", height: "100%" }} source={profile?.avatar ? profile.avatar : AVATAR_DEFAULT} />
                            </View>
                        </TouchableOpacity>
                        <Text style={{color: white, textAlign: 'center', fontWeight: 'bold'}}>{profile?.name}</Text>
                    </View>
                    <View style={{ flex: 1 }} />
                    <View>
                        <TouchableOpacity onPress={onOpenAndSelectLover} activeOpacity={0.8} style={{ flexDirection: "row", marginBottom: 15 }}>
                            <View style={[style.loveBoxAvatarContainer, AppStyle.center]}>
                                {
                                this.profileLover? <FastImage resizeMode="contain" style={{ width: "100%", height: "100%" }} source={this.profileLover?.avatar ? this.profileLover.avatar : AVATAR_DEFAULT} /> : <Text style={{ fontSize: 35 }}>+</Text>
                                }
                            </View>
                        </TouchableOpacity>
                        <Text style={{color: white, textAlign: 'center', fontWeight: 'bold'}}>{this.profileLover?.name}</Text>
                    </View>
                </View>
            </View>
            <View style={[{flexDirection: "row", width: "100%"}, AppStyle.center]}>
                <TouchableOpacity activeOpacity={0.8} style={[style.loveBoxContainer, style.eventBoxContainer, {backgroundColor: "#ba68c8", shadowColor: "#ba68c8"}, AppStyle.m3, AppStyle.center]}>
                    <Text style={[AppStyle.h5, AppStyle.mb2, {color: black, fontWeight: "bold"}]}>Events</Text>
                    <Text style={[AppStyle.p, {color: white, textAlign: 'center'}]}>Create new schedual</Text>
                </TouchableOpacity>
                {
                    this.profileLover? <TouchableOpacity onPress={onOpenMessage} activeOpacity={0.8} style={[style.loveBoxContainer, style.eventBoxContainer, {backgroundColor: "#f06292", shadowColor: "#f06292"}, AppStyle.m3, AppStyle.center]}>
                        <Text style={[AppStyle.h5, AppStyle.mb2, {color: black, fontWeight: "bold"}]}>Messages</Text>
                        <Text style={[AppStyle.p, {color: white, textAlign: 'center'}]}>Send messages together</Text>
                    </TouchableOpacity> : <TouchableOpacity activeOpacity={0.8} style={[style.loveBoxContainer, style.eventBoxContainer, {backgroundColor: "#f06292", shadowColor: "#f06292"}, AppStyle.m3, AppStyle.center]}>
                        <Text style={[AppStyle.h5, AppStyle.mb2, {color: black, fontWeight: "bold"}]}>Messages</Text>
                        <Text style={[AppStyle.p, {color: white, textAlign: 'center'}]}>You need connect your couple</Text>
                    </TouchableOpacity>
                }
            </View>
        </ScrollView>
    </AppLayout>
}