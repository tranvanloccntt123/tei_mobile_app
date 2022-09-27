import { CommonActions, useNavigation } from "@react-navigation/native";
import React from "react";
import { LoginCommand } from "../command/LoginCommand";
import { ApiRequest } from "../common/ApiRequest";
import { MAIN_SCREEN, PROFILE_INFO_SCREEN } from "../common/RouteName";
import { saveToken } from "../untils/AuthUntils";

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

export function renderLoginCommand(this: any){

    let loginCommand = new LoginCommand(this);
    loginCommand.beforeExecute(() => {
        this.setSending(true);
    });
    loginCommand.afterExecute(() => {
        this.setSending(false);
    });
    loginCommand.resolve(async (result: any) => {
        this.setAuth(true);
        ApiRequest.token = result;
        await saveToken(result);
    });
    loginCommand.reject((result: any) => {
        this.setAlter("Please check username or password again");
        this.setAlterId(this.alterId + 1);
    });
    return loginCommand;
}