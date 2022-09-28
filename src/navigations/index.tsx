// In App.js in a new project

import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { CommonActions, NavigationContainer, useNavigation, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import { LOGIN_SCREEN, MAIN_SCREEN, POST_CREATE_SCREEN, PROFILE_ADD_RELATION_SHIP_SCREEN, PROFILE_EDIT_SCREEN, PROFILE_FIND_SCREEN, PROFILE_FIND_TITLE, PROFILE_INFO_SCREEN, PROFILE_INFO_TITLE, PROFILE_MODAL_SCREEN, SETTING_SCREEN, SPLASH_SCREEN } from '../common/RouteName';
import ProfileSlideShow from '../screens/ProfileSlideShow';
import CreatePostScreen from '../screens/PostScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProfileFindUserScreen from '../screens/ProfileFindUserScreen';
import ProfileEditScreen from '../screens/ProfileEditScreen';
import LoginScreen from '../screens/LoginScreen';
import SplashScreen from '../screens/SplashScreen';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH_ACTION_CHECK_LOGIN } from '../redux/actions/ProfileAction';
import { COMBINE_NAME_PROFILE } from '../redux/reducers/CombineName';
import MainNavigation from './main';
import ProfileAddRelationShipScreen from '../screens/ProfileAddRelationShipScreen';
import SettingScreen from '../screens/SettingScreen';
const Stack = createNativeStackNavigator();

const AppHeaderLeft = (props: any) => { 
    const navigation = useNavigation();
    const onPress = () => {
        if(props.canGoBack)
            navigation.goBack();
    }
    return props.canGoBack? <TouchableOpacity style={{padding: 8}} onPress={onPress}>
        <AntDesign name='left' size={18} />
    </TouchableOpacity> : <></>
}

const CommonConfigStackNavigation = (headerShown: boolean = true, title: string = ""):NativeStackNavigationOptions => {
    return {
        animation: 'fade',
        title,
        headerShown,
        headerLeft: AppHeaderLeft
    }
}

function AppNavigation() {
  const navigationRef = useNavigationContainerRef();
  const dispatch = useDispatch();
  const isLogged = useSelector((state: any) => state[`${COMBINE_NAME_PROFILE}`].isLogged);
  React.useEffect(() => {
    dispatch({type: AUTH_ACTION_CHECK_LOGIN});
  }, []);
  React.useEffect(() => {
    if(isLogged == null) return;
    if(isLogged)
      navigationRef.current?.dispatch(CommonActions.reset({
        index: 0,
        routes: [
          {name: MAIN_SCREEN}
        ]
      }));
    else navigationRef.current?.dispatch(CommonActions.reset({
      index: 0,
      routes: [
        {name: LOGIN_SCREEN}
      ]
    }));
  }, [isLogged]);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={SPLASH_SCREEN}>
        <Stack.Screen options={CommonConfigStackNavigation(false)} name={SPLASH_SCREEN} component={SplashScreen} />
        <Stack.Screen options={CommonConfigStackNavigation(false)} name={MAIN_SCREEN} component={MainNavigation} />
        <Stack.Screen options={CommonConfigStackNavigation(false)} name={LOGIN_SCREEN} component={LoginScreen} />
        <Stack.Screen options={CommonConfigStackNavigation(true, PROFILE_INFO_TITLE)} name={PROFILE_INFO_SCREEN} component={ProfileScreen} />
        <Stack.Screen options={CommonConfigStackNavigation(false)} name={PROFILE_MODAL_SCREEN} component={ProfileSlideShow} />
        <Stack.Screen options={CommonConfigStackNavigation(false)} name={POST_CREATE_SCREEN} component={CreatePostScreen} />
        <Stack.Screen options={CommonConfigStackNavigation(true, PROFILE_FIND_TITLE)} name={PROFILE_FIND_SCREEN} component={ProfileFindUserScreen} />
        <Stack.Screen options={CommonConfigStackNavigation(true, PROFILE_INFO_TITLE)} name={PROFILE_EDIT_SCREEN} component={ProfileEditScreen} />
        <Stack.Screen options={CommonConfigStackNavigation(true, PROFILE_INFO_TITLE)} name={PROFILE_ADD_RELATION_SHIP_SCREEN} component={ProfileAddRelationShipScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;