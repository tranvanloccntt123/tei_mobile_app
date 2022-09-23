import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { ProfileInterface } from "../common/AppInterface";
import { AppStyle } from "../common/AppStyle";
import { blue, orange, red, white } from "../common/Colors";
import ActionButton from "../components/elements/ActionButton";
import Input from "../components/elements/Input";
import AppLayout from "../components/layouts/AppLayout";
import { COMBINE_NAME_PROFILE } from "../redux/reducers/CombineName";
const style = StyleSheet.create({
    saveContainer: {width: "100%", height: 55, backgroundColor: blue, borderRadius: 10}
})
export default function ProfileEditScreen(){
    const profile: ProfileInterface = useSelector((state: any) => state[`${COMBINE_NAME_PROFILE}`].user);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [description, setDescription] = React.useState("");
    React.useEffect(() => {
        if(profile){
            setName(profile.name);
            if(profile.email)
                setEmail(profile.email);
            if(profile.description)
                setDescription(profile.description)
        }
    }, []);
    return <AppLayout>
        <View style={[AppStyle.center, AppStyle.p3, {paddingTop: 25}]}>
            <Input label="Name" value={name} onChangeText={(text) => setName(text)} keyboardType="default" />
            <Input label="Email" value={email} onChangeText={(text) => setEmail(text)} keyboardType="email-address"  />
            <Input label="Description" onChangeText={(text) => setDescription(text)} value={description} />
            <ActionButton containerStyle={style.saveContainer} onPress={() => {}}>
                <Text style={[AppStyle.h5, {color: white}]}>Save and Continue</Text>
            </ActionButton>
        </View>
    </AppLayout>
}