import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { Button, Text, Colors, Paragraph } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { AVATAR_DEFAULT } from "../assets/images";
import { ProfileInterface } from "../common/AppInterface";
import { AppStyle } from "../common/AppStyle";
import { black, gray, white } from "../common/Colors";
import { changeAvatar } from "../common/Until";
import AppLayout from "../components/layouts/AppLayout";
import { UserFactory } from "../Factory/UserFactory";
import { PROFILE_ACTION_SET_USER } from "../redux/actions/ProfileAction";
import { COMBINE_NAME_PROFILE } from "../redux/reducers/CombineName";
import { LauchImage } from "../untils/CameraUntil";
const style = StyleSheet.create({
   cardContainer: {
      margin: 15,
      padding: 15,
      backgroundColor: white,
      shadowColor: gray,
      shadowOffset: {
         width: 0,
         height: 3
      },
      shadowOpacity: 0.5,
      elevation: 5,
      borderRadius: 15
   },
   containerAvatar: {
      width: 60, 
      height: 60, 
      borderRadius: 50
   }
})
export default function SettingScreen(this: any) {
   const profile: ProfileInterface = useSelector((state: any) => state[`${COMBINE_NAME_PROFILE}`].user);
   const dispatch = useDispatch();
   const onChangeAvatar = async () => LauchImage(() => {}, async (result: any) => {
      let r = await changeAvatar(result[0].uri, result[0].fileName, result[0].type);
      if(r){
         dispatch({type: PROFILE_ACTION_SET_USER, user: new UserFactory("ProfileInterface", {...profile, avatar: r.avatar}).build()});
      }
   });

   return <AppLayout containerStyle={{ backgroundColor: Colors.grey100 }}>
      <View style={style.cardContainer}>
         <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={style.containerAvatar} onPress={onChangeAvatar} activeOpacity={0.8} >
               <FastImage style={{width: "100%", height: "100%", borderRadius: 50}} source={profile.avatar? profile.avatar : AVATAR_DEFAULT} />
            </TouchableOpacity>
            <View style={AppStyle.ml3}>
               <Text style={[AppStyle.h5, { fontWeight: 'bold' }]}>{profile.name}</Text>
               <Paragraph>{profile.email ? profile.email : ""}</Paragraph>
            </View>
         </View>
         <View style={[{ flexDirection: "row", alignItems: "center" }, AppStyle.mt3]}>
            <Text style={{ color: gray, flex: 1 }}>version 1.0.0</Text>
            <Button style={[{ alignSelf: "flex-end" },]} labelStyle={{ color: black }}>Logout</Button>
         </View>
      </View>
   </AppLayout>
}