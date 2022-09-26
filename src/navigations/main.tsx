import React from "react";
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from "react-native";
import { HOME_LOVE_SCREEN } from "../common/RouteName";
import HomeLoveScreen from "../screens/home/LoveScreen";

const CommonConfigTabNavigation = (headerShown: boolean = true, title: string = ""): BottomTabNavigationOptions => {
    return {
        title,
        headerShown
    }
}


const Tab = createBottomTabNavigator();
export default function MainNavigation(){
    return <Tab.Navigator>
    <Tab.Screen options={CommonConfigTabNavigation(false, "Home")} name={HOME_LOVE_SCREEN} component={HomeLoveScreen} />
  </Tab.Navigator>
}