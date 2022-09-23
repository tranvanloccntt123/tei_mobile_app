import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { AppStyle } from "../common/AppStyle";
import { blue } from "../common/Colors";
import { ScreenInterface } from "../common/AppInterface";
import LoginForm from "../components/forms/LoginForm";
import LoginLayout from "../components/layouts/AuthLayout";
import { stateManagement } from "../sevices/AuthServices";
import { LoginCommand } from "../command/LoginCommand";
import { CommandInvoker } from "../command/Command";
export default function LoginScreen(this: any, props: ScreenInterface){
    stateManagement.call(this);
    let loginCommand = new LoginCommand(this);
    const onLoginPress = () =>  CommandInvoker(loginCommand, {username: this.username, password: this.password})
    
    return <LoginLayout alterMessage={""} alterID={""}>
        <Text style={[AppStyle.h1, AppStyle.mb5]}>Sign In</Text>    
        <LoginForm 
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