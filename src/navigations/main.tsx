import React from "react";
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HOME_LOVE_SCREEN, SETTING_SCREEN } from "../common/RouteName";
import HomeLoveScreen from "../screens/home/LoveScreen";
import { loadALlRelationShip } from "../untils/RelationShipUntil";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { black, pink, white } from "../common/Colors";
import SettingScreen from "../screens/SettingScreen";
const CommonConfigTabNavigation = (headerShown: boolean = true, title: string = ""): BottomTabNavigationOptions => {
    return {
        title,
        headerShown
    }
}

const Tab = createBottomTabNavigator();
export default function MainNavigation(){
    React.useEffect(() => { 
        loadALlRelationShip();
    }, []);
    return <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: pink,
        tabBarInactiveBackgroundColor: white,
        tabBarLabelStyle: {fontSize: 18},
        tabBarShowLabel: false,
    }}>
    <Tab.Screen options={{
        ...CommonConfigTabNavigation(false, ""),
        tabBarIcon(props) {
            return <AntDesign name={props.focused? "heart" : "hearto"} size={props.size} color={props.color} />
        },
    }} name={HOME_LOVE_SCREEN} component={HomeLoveScreen} />
    <Tab.Screen options={{
        ...CommonConfigTabNavigation(false, ""),
        tabBarIcon(props) {
            return <AntDesign name={"setting"} size={props.size} color={props.color} />
        },
    }} name={SETTING_SCREEN} component={SettingScreen} />
  </Tab.Navigator>
}