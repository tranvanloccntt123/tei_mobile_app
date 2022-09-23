import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { AppStyle } from "../../common/AppStyle";
import { COMBINE_NAME_REGISTER } from "../../redux/reducers/CombineName";
import { ErrorRegisterReducerInterface } from "../../redux/reducers/RegisterReducer";
import { CheckAuthentication, CheckPass, CheckUser } from "../../untils/AuthUntils";
import Button from "../elements/Button";
import Input from "../elements/Input";
interface RegisterFormProps{
    onRegisterPress: Function
}
export default function RegisterForm(props:RegisterFormProps){
    const [name, setName] = React.useState<string>("");
    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [confirmPassword, setConfirmPassword] = React.useState<string>("");
    const [errorName, setErrorName] = React.useState<string>("");
    const [errorUser, setErrorUser] = React.useState<string>("");
    const [errorPass, setErrorPass] = React.useState<string>("");
    const [errorConfirm, setErrorConfirm] = React.useState<string>("");
    const stateError:ErrorRegisterReducerInterface = useSelector((state: any) => state[`${COMBINE_NAME_REGISTER}`].error);

    React.useEffect(() => {
        if(stateError.name) setErrorName(stateError.name);
        if(stateError.password) setErrorPass(stateError.password);
        if(stateError.username) setErrorUser(stateError.username);
    }, [stateError]);

    const onRegisterPress = () => {
        if(CheckAuthentication(username, password)) {
            if(password ==  confirmPassword && name != "")
                props.onRegisterPress(name, username, password);
            setErrorConfirm(password != confirmPassword? confirmPassword.length? "Confirm password not same password" : "Confirm password's length is 6 - 15" : "");
        } else setErrorConfirm("");
        setErrorName(name == ""? "Name is not empty" : "")
        setErrorUser(CheckUser(username)? "" : "User's length is 6 - 15");
        setErrorPass(CheckPass(password)? "" : "Pass's length is 6 - 15");
    }
    return <View style={[{width: '100%'}, AppStyle.pr3, AppStyle.pl3]}>
        <Input label={"Name"} value={name} onChangeText={(text) => setName(text)} error={errorName} />
        <Input label={"Username"} value={username} onChangeText={(text) => setUsername(text)} error={errorUser} />
        <Input label={"Password"} secureTextEntry value={password} onChangeText={(text) => setPassword(text)} error={errorPass} />
        <Input label={"Confirm Password"} secureTextEntry value={confirmPassword} onChangeText={(text) => setConfirmPassword(text)} error={errorConfirm} />
        <Button label="Sign Up" onPress={onRegisterPress} />
    </View>
}