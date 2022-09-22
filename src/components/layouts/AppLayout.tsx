import React, { ReactNode } from "react";
import { StatusBar, View, SafeAreaView } from "react-native";
import { AppStyle } from "../../common/AppStyle";
import { white } from "../../common/Colors";
import { useLoadProfile } from "../../sevices/ProfileServices";
interface PropsInterface{
    children?: ReactNode | JSX.Element | JSX.Element[],
}
export default function AppLayout(props: PropsInterface) {
    useLoadProfile();
    return <View style={[AppStyle.container, { backgroundColor: white }]}>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />
        <SafeAreaView style={[AppStyle.container]}>
            {
                props.children
            }
        </SafeAreaView>
    </View>
}