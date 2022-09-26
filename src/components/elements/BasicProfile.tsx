import React, { ReactNode } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { AVATAR_DEFAULT } from "../../assets/images";
import { CheckRelationInterface, ProfileInterface } from "../../common/AppInterface";
import { AppStyle } from "../../common/AppStyle";
import { black, blue, gray, green, orange, red, violet, white } from "../../common/Colors";
import Feather from 'react-native-vector-icons/Feather';
import { checkRelationShip, sendRelationShip } from "../../common/Until";
import { useNavigation } from "@react-navigation/native";
import { POST_CREATE_SCREEN, PROFILE_ADD_RELATION_SHIP_SCREEN, PROFILE_EDIT_SCREEN } from "../../common/RouteName";
interface PropsInterface {
    children?: ReactNode | JSX.Element | JSX.Element[],
    current: ProfileInterface,
    countPost: number,
    countFriend: number,
    visit: boolean,
    user_id?: number
}
const style = StyleSheet.create({
    container: { backgroundColor: white, marginBottom: 25, elevation: 15, shadowColor: gray, shadowOpacity: 0.5, shadowOffset: { width: 5, height: 5 } },
    profileContainer: { flexDirection: "row", marginBottom: 15, marginTop: 15 },
    avatarContainer: { borderWidth: 2, borderColor: blue, padding: 5, width: 100, height: 100, borderRadius: 80 },
    createPostButtonContainer: { borderRadius: 35, height: 45, backgroundColor: blue, shadowColor: blue, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, elevation: 5, flexDirection: "row", paddingHorizontal: 25 },
    actionButtonContainer: { width: 45, height: 45, borderRadius: 45, elevation: 5, shadowOpacity: 0.3, shadowOffset: { width: 0, height: 2 } },
    cancelButtonContainer: { backgroundColor: gray, shadowColor: gray },
    acceptButtonContainer: { backgroundColor: green, shadowColor: green }
});
export default function BasicProfile(props: PropsInterface) {
    const [relationShip, setRelationShip] = React.useState<CheckRelationInterface>();
    const navigation = useNavigation();
    const getData = async () => {
        if(!props.user_id) return;
        let result = await checkRelationShip(props.user_id);
        if(result == null) return;
        setRelationShip(result);
    }
    React.useEffect(() => {
        if(props.visit)
            getData()
    }, [props.user_id]);

    const onRequest = async () => {
        let r = await sendRelationShip(props.user_id? props.user_id : 0 , 0);
        if(r) setRelationShip(r);
    }

    const onCancel = async () => {
        let r = await sendRelationShip(props.user_id? props.user_id : 0 , -1);
        if(r) setRelationShip(r);
    }

    const onAccept = async () => {
        let r = await sendRelationShip(props.user_id? props.user_id : 0, 1);
        if(r) setRelationShip(r);
    }

    const renderButton = () => {
        if(!relationShip) return null;
        if(relationShip.status == 0 && relationShip.personRequest) return <TouchableOpacity onPress={onCancel} activeOpacity={0.8} style={[style.createPostButtonContainer, style.cancelButtonContainer, AppStyle.center]}>
            <Text style={[{ color: black }, AppStyle.h5]}>Cancel</Text>
        </TouchableOpacity>
        if(relationShip.status == 0 && !relationShip.personRequest) return <TouchableOpacity onPress={onAccept} activeOpacity={0.8} style={[style.createPostButtonContainer, style.acceptButtonContainer, AppStyle.center]}>
            <Text style={[{ color: white }, AppStyle.h5]}>Accept</Text>
        </TouchableOpacity>
        if(relationShip.status == -1 ) return <TouchableOpacity onPress={onRequest} activeOpacity={0.8} style={[style.createPostButtonContainer, AppStyle.center]}>
            <Text style={[{ color: white }, AppStyle.h5]}>Request</Text>
        </TouchableOpacity>
        if( relationShip.status == 1 ) return <TouchableOpacity onPress={onCancel} activeOpacity={0.8} style={[style.createPostButtonContainer, style.cancelButtonContainer, AppStyle.center]}>
                <Text style={[{ color: black }, AppStyle.h5]}>Unfriend</Text>
        </TouchableOpacity>
        return null;
    }

    const onAddRelationShip = () => navigation.navigate(PROFILE_ADD_RELATION_SHIP_SCREEN as never, {id: props.user_id} as never)

    return <View style={[style.container, AppStyle.pt3]}>
        <View style={[AppStyle.center]}>
            <View style={style.avatarContainer}>
                <FastImage resizeMode="contain" style={{ width: "100%", height: "100%", borderRadius: 80 }} source={AVATAR_DEFAULT} />
            </View>
            <View style={[AppStyle.p3]}>
                <Text style={[AppStyle.h5, { fontWeight: "bold", textAlign: "center"}]}>{props.current ? props.current.name : ""}</Text>
                {
                    props.current?.email ? <Text style={[AppStyle.p, { color: gray, textAlign: "center" }]}>{props.current.email}</Text> : null
                }
                {
                    props.current?.description ? <Text style={[AppStyle.p, { color: gray, textAlign: "center" }]}>{props.current.description}</Text> : null
                }

            </View>
        </View>
        <View style={[{ flexDirection: "row" }, AppStyle.center]}>
            {
                !props.visit ? <>
                    <TouchableOpacity onPress={() => navigation.navigate(POST_CREATE_SCREEN as never, {} as never)} activeOpacity={0.8} style={[style.createPostButtonContainer, AppStyle.center, AppStyle.mr3]}>
                        <Text style={[{ color: white }, AppStyle.h5]}>Create post</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate(PROFILE_EDIT_SCREEN as never)} activeOpacity={0.8} style={[style.actionButtonContainer, AppStyle.center, { backgroundColor: red, shadowColor: red }]}>
                        <Feather name="edit" size={20} color={white} />
                    </TouchableOpacity></> 
                : <>
                    {
                        renderButton()
                    }
                    {
                        relationShip?.status == 1? <TouchableOpacity onPress={onAddRelationShip} activeOpacity={0.8} style={[style.actionButtonContainer, AppStyle.center, AppStyle.ml3, { backgroundColor: red, shadowColor: red }]}>
                            <Feather name="smile" size={20} color={white} />
                        </TouchableOpacity> : null
                    }
                </>
            }
        </View>
        <View style={style.profileContainer}>
            <View style={[{ flex: 1, borderRightWidth: 1, borderRightColor: violet + 65 }, AppStyle.center]}>
                <Text style={[AppStyle.h3, { color: orange }]}>{props.countFriend}</Text>
                <Text>Friends</Text>
            </View>
            <View style={[{ flex: 1 }, AppStyle.center]}>
                <Text style={[AppStyle.h3, { color: orange }]}>0</Text>
                <Text>Images</Text>
            </View>
            <View style={[{ flex: 1, borderLeftWidth: 1, borderLeftColor: violet + 65 }, AppStyle.center]}>
                <Text style={[AppStyle.h3, { color: orange }]}>{props.countPost}</Text>
                <Text>Posts</Text>
            </View>
        </View>
    </View>
}