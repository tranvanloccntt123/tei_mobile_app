import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { AppStyle } from "../common/AppStyle";
import { blue } from "../common/Colors";
import { ScreenInterface } from "../common/AppInterface";
import LoginForm from "../components/forms/LoginForm";
import LoginLayout from "../components/layouts/AuthLayout";
import { renderLoginCommand, stateManagement } from "../sevices/AuthServices";
import { LoginCommand } from "../command/LoginCommand";
import { CommandInvoker } from "../command/Command";
import { ApiRequest } from "../common/ApiRequest";
import { saveToken } from "../untils/AuthUntils";
export default function LoginScreen(this: any, props: ScreenInterface){
    stateManagement.call(this);

    let loginCommand = renderLoginCommand.call(this);
    
    const onLoginPress = () =>  CommandInvoker(loginCommand, {username: this.username, password: this.password})
    
    return <LoginLayout alterMessage={this.alter} alterID={this.alterId}>
        <Text style={[AppStyle.h1, AppStyle.mb5]}>Sign In</Text>    
        <LoginForm 
            isSending={this.sending}
            user={this.username} 
            password={this.password} 
            setUser={this.setUserName}
            setPassword={this.setPassword}
            errorUser={this.errorUserName}
            errorPassword={this.errorPassword}
            onLoginPress={onLoginPress} 
        />
        <TouchableOpacity activeOpacity={0.9} style={{marginTop: 25}}>
            <Text style={[{color: blue}, AppStyle.h5]}>Create account</Text>
        </TouchableOpacity>
    </LoginLayout>
}