import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { ProfileInterface } from "../common/AppInterface";
import { AppStyle } from "../common/AppStyle";
import { orange, red, white } from "../common/Colors";
import ActionButton from "../components/profile/elements/ActionButton";
import AppLayout from "../components/layouts/AppLayout";
import { COMBINE_NAME_PROFILE } from "../redux/reducers/CombineName";
const style = StyleSheet.create({
    saveContainer: {width: "100%", height: 55, backgroundColor: orange, borderRadius: 10}
})
export default function ProfileEditScreen(){
    const profile: ProfileInterface = useSelector((state: any) => state[`${COMBINE_NAME_PROFILE}`].user);
    console.log(profile);
    return <AppLayout>
        <View style={[AppStyle.center, AppStyle.p3]}>
            <ActionButton containerStyle={style.saveContainer} onPress={() => {}}>
                <Text style={[AppStyle.h5, {color: white}]}>Save and Continue</Text>
            </ActionButton>
        </View>
    </AppLayout>
}