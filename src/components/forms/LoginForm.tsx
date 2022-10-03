import React from "react";
import { View, ActivityIndicator } from "react-native";
import { AppStyle } from "../../common/AppStyle";
import { white } from "../../common/Colors";
import Button from "../elements/Button";
import Input from "../elements/Input";
interface LoginFormProps{
    onLoginPress: Function,
    user: string,
    password: string,
    errorUser: string,
    errorPassword: string,
    setUser: Function,
    setPassword: Function,
    isSending: boolean
}
export default function LoginForm(props: LoginFormProps){
    return <View style={[{width: '100%'}, AppStyle.pr3, AppStyle.pl3]}>
        <Input value={props.user} onChangeText={(text) => props.setUser(text)} label="Username" maxLength={25} error={props.errorUser} />
        <Input value={props.password} onChangeText={(text) => props.setPassword(text)} label="Password" secureTextEntry={true} maxLength={25} error={props.errorPassword} />
        <Button 
            label="Đăng nhập" 
            onPress={() => props.onLoginPress()} 
            childrenLeft={props.isSending? <ActivityIndicator color={white} style={[AppStyle.ml3]} /> : null}
        />
    </View>
}