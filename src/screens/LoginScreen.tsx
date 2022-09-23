import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppStyle } from "../common/AppStyle";
import { blue } from "../common/Colors";
import { MAIN_SCREEN, PROFILE_INFO_SCREEN } from "../common/RouteName";
import { ScreenInterface } from "../common/AppInterface";
import LoginForm from "../components/forms/LoginForm";
import LoginLayout from "../components/layouts/AuthLayout";
import { LOGIN_ACTION_SEND_REQUEST } from "../redux/actions/LoginActions";
import { COMBINE_NAME_LOGIN } from "../redux/reducers/CombineName";
import { LoginReducerAction } from "../redux/reducers/LoginReducer";
import { useNavigation } from "@react-navigation/native";
export default function LoginScreen(props: ScreenInterface){
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const {alter, status} = useSelector((state: any) => {
        return {
            alter: state[`${COMBINE_NAME_LOGIN}`].alter,
            status: state[`${COMBINE_NAME_LOGIN}`].status
        }
    });
    React.useEffect(() => {
        if(status)
            navigation.navigate(PROFILE_INFO_SCREEN as never);
    },[status]);
    const onLoginPress = (user: string, pass: string) => {
        let tUSer = __DEV__? "teiresource" : user
        let tPass = __DEV__? "12asdfA@" : pass
        const action:LoginReducerAction = {
            type: LOGIN_ACTION_SEND_REQUEST,
            input: {
                username: tUSer,
                password: tPass
            }
        };
        dispatch(action);
    }
    return <LoginLayout alterMessage={alter.message} alterID={alter._id}>
        <Text style={[AppStyle.h1, AppStyle.mb5]}>Sign In</Text>    
        <LoginForm onLoginPress={onLoginPress} />
        <TouchableOpacity activeOpacity={0.9} style={{marginTop: 25}}>
            <Text style={[{color: blue}, AppStyle.h5]}>Create account</Text>
        </TouchableOpacity>
    </LoginLayout>
}