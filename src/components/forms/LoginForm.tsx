import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { AppStyle } from "../../common/AppStyle";
import { COMBINE_NAME_LOGIN } from "../../redux/reducers/CombineName";
import { CheckAuthentication, CheckPass, CheckUser } from "../../untils/AuthUntils";
import Button from "../elements/Button";
import Input from "../elements/Input";
interface LoginFormProps{
    onLoginPress: Function
}
export default function LoginForm(props: LoginFormProps){
    const [user, setUser] = React.useState<string>("");
    const [pass, setPass] = React.useState<string>("");
    const [errorUser, setErrorUser] = React.useState<string>("");
    const [errorPass, setErrorPass] = React.useState<string>("");
    const stateError = useSelector((state: any) => state[`${COMBINE_NAME_LOGIN}`].error);
    React.useEffect(() => {
        if(stateError.username) setErrorUser(stateError.username);
        if(stateError.password) setErrorPass(stateError.password)
    }, [stateError]);
    const onLoginPress = async () => {
        if(CheckAuthentication(user, pass)) {
            props.onLoginPress(user, pass);
        }
        setErrorUser(CheckUser(user)? "" : "User's length is 6 - 15");
        setErrorPass(CheckPass(pass)? "" : "Pass's length is 6 - 15");
    }
    return <View style={[{width: '100%'}, AppStyle.pr3, AppStyle.pl3]}>
        <Input value={user} onChangeText={(text) => setUser(text)} label="Username" maxLength={25} error={errorUser} />
        <Input value={pass} onChangeText={(text) => setPass(text)} label="Password" secureTextEntry={true} maxLength={25} error={errorPass} />
        <Button label="Sign In" onPress={onLoginPress} />
    </View>
}