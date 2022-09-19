import React from "react";
import { Dimensions, StyleSheet, View, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { Text } from "react-native-paper";
import { AVATAR_DEFAULT } from "../../../assets/images";
import { CheckRelationInterface, ProfileInterface } from "../../../common/AppInterface";
import { AppStyle } from "../../../common/AppStyle";
import { gray, white, black } from "../../../common/Colors";
import BasicCommonMedia from "./BasicCommonMedia";
import BasicHorizontalFriend from "./BasicHorizontalFriend";
const { width, height } = Dimensions.get('window');
const style = StyleSheet.create({
    settingContainer: { width: 25, height: 25, backgroundColor: white, borderRadius: 5, shadowColor: black, shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.5, elevation: 3 },
    avatarContainer: { padding: 3, backgroundColor: white, borderRadius: width, marginBottom: 20 },
    avatar: { width: width * 0.3, height: width * 0.3, borderRadius: width },
    relationShipButtonContainer: { borderWidth: 1, borderRadius: 5, marginLeft: 15, borderColor: gray + 95, paddingVertical: 5, paddingHorizontal: 15, backgroundColor: black + "95", justifyContent: "center" }
});
function renderStatusToText(relationShip: CheckRelationInterface | null) {
    if(relationShip == null) return "";
    const {status, personRequest} = relationShip;
    if (status == 1) return "Unfriend";
    if (status == 0 && !personRequest) return "Accept";
    if (status == 0 && personRequest) return "Cancel";
    if (status == -1) return "Request";
    return "";
}

interface PropsInterface {
    commonMedia: Array<any>
    user: ProfileInterface,
    friends?: Array<any>,
    countFriend: number,
    countPost: number,
    LoadPostFunction: Function,
    relationShip: CheckRelationInterface | null,
    handleRelationShip: Function,
    isVisit: boolean
}
export default function BasicHeader(props: PropsInterface){
    const [relationShip, setRelationShip] = React.useState(props.relationShip);
    const onHandleRelationShip = async () => {
        let newRelation = await props.handleRelationShip();
        setRelationShip(newRelation);
    }
    return <View>
    <View style={[{ flex: 1, height: height * 0.5, maxHeight: 400 }, AppStyle.center]}>
        <View style={style.avatarContainer}>
            <FastImage source={AVATAR_DEFAULT} style={style.avatar} />
        </View>
        <Text style={[AppStyle.h2, { color: white, fontWeight: 'normal', textAlign: "center" }, AppStyle.mb1]}>{props.user.name}</Text>
        <Text style={[AppStyle.p, { color: white, fontWeight: 'normal', textAlign: "center" }, AppStyle.mb3]}>tranvanloccntt123@gmail.com</Text>
        <View style={{ flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 15 }}>
            <View style={[{ flex: 1 }, AppStyle.center]}>
                <Text style={[AppStyle.h3, { color: white }]}>{props.countFriend < 1000 ? props.countFriend : `${props.countFriend / 1000}k`}</Text>
                <Text style={[AppStyle.p, { color: gray }]}>Friends</Text>
            </View>
            <View style={[{ flex: 2 }, AppStyle.center]}>
                {
                   props.isVisit && props.relationShip && props.relationShip.status != 3 ? <TouchableOpacity onPress={onHandleRelationShip} activeOpacity={0.8} style={style.relationShipButtonContainer}>
                        <Text style={{ color: white }}>{renderStatusToText(relationShip)}</Text>
                    </TouchableOpacity> : null
                }
            </View>
            <View style={[{ flex: 1 }, AppStyle.center]}>
                <Text style={[AppStyle.h3, { color: white }]}>{props.countPost < 1000 ? props.countPost : `${props.countPost / 1000}k`}</Text>
                <Text style={[AppStyle.p, { color: gray }]}>Posts</Text>
            </View>
        </View>
    </View>
    <BasicHorizontalFriend isVisit={props.isVisit} data={props.friends ? props.friends : []} />
    <BasicCommonMedia isVisit={props.isVisit} data={props.commonMedia} />
</View>
}