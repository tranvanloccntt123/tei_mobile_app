import React, { ReactNode } from "react";
import { StatusBar, View, SafeAreaView } from "react-native";
import { AppStyle } from "../../common/AppStyle";
import { white } from "../../common/Colors";
import { useLoadProfile } from "../../sevices/ProfileServices";
import Alter from "../elements/Alter";
interface PropsInterface{
    children?: ReactNode | JSX.Element | JSX.Element[],
    alterMessage?: string,
    alterID?: string | number,
    alterStatus?: number
}
export default function AppLayout(props: PropsInterface) {
    const message: string | undefined = props.alterMessage;
    useLoadProfile();
    const ShowAlter = React.useCallback(() => message ? <Alter status={props.alterStatus} message={message} _id={props.alterID ? props.alterID : 0} /> : <></>, [props.alterID]);
    return <View style={[AppStyle.container, { backgroundColor: white }]}>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />
        <SafeAreaView style={[AppStyle.container]}>
            {
                ShowAlter()
            }
            {
                props.children
            }
        </SafeAreaView>
    </View>
}