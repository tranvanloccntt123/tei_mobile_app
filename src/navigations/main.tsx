import React from "react";
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HOME_LOVE_SCREEN, SETTING_SCREEN } from "../common/RouteName";
import HomeLoveScreen from "../screens/home/LoveScreen";
import { loadALlRelationShip, loadRelationShipToStorage } from "../untils/RelationShipUntil";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { pink, white } from "../common/Colors";
import SettingScreen from "../screens/SettingScreen";
import { useDispatch } from "react-redux";
import { RELATION_ACTION_SET } from "../redux/actions/RelationAction";
const CommonConfigTabNavigation = (headerShown: boolean = true, title: string = ""): BottomTabNavigationOptions => {
    return {
        title,
        headerShown
    }
}

const Tab = createBottomTabNavigator();
export default function MainNavigation(){
    const dispatch = useDispatch();
    React.useEffect(() => { 
        loadALlRelationShip(async (item: any) => {
            let result = await loadRelationShipToStorage(item);
            if(result)
                dispatch({type: RELATION_ACTION_SET, userId: result, relation: item});
        });
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