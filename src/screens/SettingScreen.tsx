import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, List, Button, Avatar, Appbar, Text, Colors, Paragraph } from "react-native-paper";
import { useSelector } from "react-redux";
import { AVATAR_DEFAULT } from "../assets/images";
import { ProfileInterface } from "../common/AppInterface";
import { AppStyle } from "../common/AppStyle";
import { black, gray, grayLightPrimary2, grayPrimary, red, white } from "../common/Colors";
import AppLayout from "../components/layouts/AppLayout";
import { COMBINE_NAME_PROFILE } from "../redux/reducers/CombineName";
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
   }
})
export default function SettingScreen(this: any){
   const profile: ProfileInterface = useSelector((state: any) => state[`${COMBINE_NAME_PROFILE}`].user);
   return <AppLayout containerStyle={{backgroundColor: Colors.grey100}}>
      <View style={style.cardContainer}>
         <View style={{flexDirection: "row"}}>
            <Avatar.Image source={AVATAR_DEFAULT} />
            <View style={AppStyle.ml3}>
               <Text style={[AppStyle.h5, {fontWeight: 'bold'}]}>{profile.name}</Text>
               <Paragraph>{profile.email? profile.email : ""}</Paragraph>
            </View>
         </View>
         <View style={[{flexDirection: "row", alignItems: "center"}, AppStyle.mt3]}>
            <Text style={{color: gray, flex: 1}}>version 1.0.0</Text>
            <Button style={[{alignSelf: "flex-end"},]} labelStyle={{color: black}}>Logout</Button>
         </View>
      </View>
      
   </AppLayout>
}