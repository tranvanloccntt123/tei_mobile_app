// In App.js in a new project

import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import { POST_CREATE_SCREEN, POST_CREATE_TITLE, PROFILE_FIND_SCREEN, PROFILE_FIND_TITLE, PROFILE_INFO_SCREEN, PROFILE_MODAL_SCREEN } from '../common/RouteName';
import ProfileSlideShow from '../screens/ProfileSlideShow';
import CreatePostScreen from '../screens/CreatePostScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProfileFindUserScreen from '../screens/ProfileFindUserScreen';
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
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={CommonConfigStackNavigation(false)} name={PROFILE_INFO_SCREEN} component={ProfileScreen} />
        <Stack.Screen options={CommonConfigStackNavigation(false)} name={PROFILE_MODAL_SCREEN} component={ProfileSlideShow} />
        <Stack.Screen options={CommonConfigStackNavigation(true, POST_CREATE_TITLE)} name={POST_CREATE_SCREEN} component={CreatePostScreen} />
        <Stack.Screen options={CommonConfigStackNavigation(true, PROFILE_FIND_TITLE)} name={PROFILE_FIND_SCREEN} component={ProfileFindUserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;