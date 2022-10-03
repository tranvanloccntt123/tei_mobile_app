import React from "react";
import { Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppStyle } from "../common/AppStyle";
import { LOGIN_SCREEN } from "../common/RouteName";
import { ScreenInterface } from "../common/AppInterface";
import RegisterForm from "../components/forms/RegisterForm";
import LoginLayout from "../components/layouts/AuthLayout";
import { REGISTER_ACTION_SEND_REQUEST } from "../redux/actions/RegisterActions";
import { COMBINE_NAME_REGISTER } from "../redux/reducers/CombineName";
import { RegisterReducerAction } from "../redux/reducers/RegisterReducer";
export default function RegisterScreen(props: ScreenInterface){
    const dispatch = useDispatch();
    const {status, alter} = useSelector((state: any) => {
        return {
            status: state[`${COMBINE_NAME_REGISTER}`].status,
            alter: state[`${COMBINE_NAME_REGISTER}`].alter
        }
    });

    React.useEffect(() => {
    }, [alter])

    React.useEffect(() => {
        if(status)
            props.navigation?.navitate({key: LOGIN_SCREEN})
    },[status]);

    const onRegisterPress = (name: string, user: string, pass:string) => {
        let tName:string = __DEV__? "teiresource" : name;
        let tUser:string = __DEV__? "teiresource" : user;
        let tPass:string = __DEV__? "12asdfA@" : pass;
        const action:RegisterReducerAction = {
            type: REGISTER_ACTION_SEND_REQUEST,
            input: {
                name: tName,
                username: tUser,
                password: tPass
            }
        };
        dispatch(action);
    }
    return <LoginLayout alterID={alter._id} alterMessage={alter.message}>
        <Text style={[AppStyle.h1, AppStyle.mb5]}>Sign Up</Text>  
        <RegisterForm onRegisterPress={onRegisterPress} />
    </LoginLayout>
}