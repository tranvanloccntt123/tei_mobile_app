import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ProfileInterface } from "../../common/AppInterface";
import { AppStyle } from "../../common/AppStyle";
import { blue, white } from "../../common/Colors";
import Button from "../elements/Button";
import Input from "../elements/Input";
const style = StyleSheet.create({
    saveContainer: {width: "100%", height: 55, backgroundColor: blue}
})
interface PropsInterface{
    profile: ProfileInterface,
    onSavePress?: Function,
    errorName?: string,
    errorEmail?: string,
    errorDescription?: string
}

export default function EditProfileForm(props:PropsInterface) {
    const {profile} = props;
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [visible, setVisible] = React.useState<boolean>(false);
    React.useEffect(() => {
        if(profile){
            setName(profile.name);
            if(profile.email)
                setEmail(profile.email);
            if(profile.description)
                setDescription(profile.description)
        }
    }, []);
    const onPress = async () => {
        setVisible(true);
        if(props.onSavePress)
            await props.onSavePress(name, email, description);
        setVisible(false);
    }
    return <View style={{width: "100%"}}>
        <Input label="Name" error={props.errorName} value={name} onChangeText={(text) => setName(text)} keyboardType="default" />
        <Input label="Email" error={props.errorEmail} value={email} onChangeText={(text) => setEmail(text)} keyboardType="email-address" />
        <Input label="Description" error={props.errorDescription} onChangeText={(text) => setDescription(text)} value={description} />
        <Button label="Save and Continue" onPress={onPress} childrenLeft={visible? <ActivityIndicator style={AppStyle.ml3} color={white} /> : null} />
    </View>
}