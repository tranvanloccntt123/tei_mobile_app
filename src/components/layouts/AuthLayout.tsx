import React, { ReactNode } from "react";
import { Text, View, StyleSheet, Keyboard, KeyboardAvoidingView, Platform, StatusBar, SafeAreaView } from "react-native";
import { AppStyle } from "../../common/AppStyle";
import { orange, red, white } from "../../common/Colors";
import Alter from "../elements/Alter";
interface LayoutProps {
    children?: ReactNode | JSX.Element | JSX.Element[],
    alterMessage?: string,
    alterID?: string | number
};
const style = StyleSheet.create({
    from: { position: "absolute", bottom: 25 },
    author: { color: orange, fontWeight: 'bold' },
})
export default function LoginLayout(props: LayoutProps) {
    const message: string | undefined = props.alterMessage;
    const [keyboardStatus, setKeyboardStatus] = React.useState(false);
    React.useEffect(() => {
        const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardStatus(true));
        const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardStatus(false));
        return () => {
            show.remove();
            hide.remove();
        }
    }, []);
    const ShowAlter = () => message ? <Alter message={message} _id={props.alterID ? props.alterID : 0} /> : <></>
    return <View style={[AppStyle.container, {backgroundColor: white}]}>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}>
            <SafeAreaView style={[AppStyle.container, AppStyle.center, { width: '100%', position: 'relative' }]}>
                {
                    ShowAlter()
                }
                {
                    props.children
                }
                <Text style={[style.from, AppStyle.p, { display: keyboardStatus ? 'none' : 'flex' }]}>From by <Text style={[style.author, AppStyle.h5]}>Tei</Text></Text>
            </SafeAreaView>
        </KeyboardAvoidingView>
    </View>
}