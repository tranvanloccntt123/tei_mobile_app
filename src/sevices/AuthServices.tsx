import { CommonActions, useNavigation } from "@react-navigation/native";
import React from "react";
import { MAIN_SCREEN, PROFILE_INFO_SCREEN } from "../common/RouteName";

export function stateManagement(this: any, route?: any) {
    const navigation = useNavigation();
    const [checkAuth, setCheckAuth] = React.useState<boolean>(false);
    const [username, setUserName] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [confirmPassword, setConfirmPassword] = React.useState<string>("");
    const [errorUserName, setErrorUserName] = React.useState<string>("");
    const [errorPassword, setErrorPassword] = React.useState<string>("");
    const [errorConfirmPassword, setErrorConfirmPassword] = React.useState<string>("");
    const [alter, setAlter] = React.useState("");
    const [alterId, setAlterId] = React.useState(0);
    const [sending, setSending] = React.useState<boolean>(false);

    this.auth = checkAuth;
    this.setAuth = setCheckAuth;
    this.username = username;
    this.setUserName = setUserName;
    this.password = password;
    this.setPassword = setPassword;
    this.confirmPassword = confirmPassword;
    this.setConfirmPassword = setConfirmPassword;
    this.errorUserName = errorUserName;
    this.setErrorUserName = setErrorUserName;
    this.errorPassword = errorPassword;
    this.setErrorPassword = setErrorPassword;
    this.errorConfirmPassword = errorConfirmPassword;
    this.setErrorConfirmPassword = setErrorConfirmPassword;
    this.alter = alter;
    this.setAlter = setAlter;
    this.alterId = alterId;
    this.setAlterId = setAlterId;
    this.sending = sending;
    this.setSending = setSending;

    React.useEffect(() => {
        if(this.auth)
        {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: MAIN_SCREEN
                        }
                    ]
                })
            );
        }
    }, [this.auth]);
}