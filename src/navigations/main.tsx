import React from "react";
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HOME_LOVE_SCREEN, SETTING_SCREEN } from "../common/RouteName";
import HomeLoveScreen from "../screens/home/LoveScreen";
import { loadALlRelationShip, loadRelationShipToStorage, loadStartDayInStorage, saveRelationShipToStorage } from "../untils/RelationShipUntil";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { pink, white } from "../common/Colors";
import SettingScreen from "../screens/SettingScreen";
import { useDispatch } from "react-redux";
import { RELATION_ACTION_SET } from "../redux/actions/RelationAction";
import { getListDetailRelationShip } from "../common/Until";
const CommonConfigTabNavigation = (headerShown: boolean = true, title: string = ""): BottomTabNavigationOptions => {
    return {
        title,
        headerShown
    }
}

const Tab = createBottomTabNavigator();
export default function MainNavigation(){
    const dispatch = useDispatch();

    const syncData = async () => {
        await loadALlRelationShip(async (item: any) => {
            let result = await loadRelationShipToStorage(item);
            let startDay = await loadStartDayInStorage(item);
            if(result && startDay)
                dispatch({type: RELATION_ACTION_SET, userId: result, relation: item, startDay: startDay});
        });

        let remote = await getListDetailRelationShip();
        if(remote){
            remote.forEach((item: any) => {
                dispatch({type: RELATION_ACTION_SET, userId: item.friend, relation: item.description, startDay: item.start});
                saveRelationShipToStorage(item.description, item.friend, item.start);
            })
        }

    }

    React.useEffect(() => { 
        syncData();
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