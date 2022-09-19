import React, { ReactNode } from "react";
import { View, StatusBar, Dimensions, StyleSheet, FlatList, SafeAreaView, Text, ImageBackground, TouchableOpacity } from "react-native";
import { AppStyle } from "@teiresource/commonconfig/AppStyle";
import { black, blue, gray, grayLightPrimary, white } from "@teiresource/commonconfig/Colors";
import { PostInterface, UserInterface } from "@teiresource/commonconfig/AppInterface";
import BasicCommonMedia from "../elements/BasicCommonMedia";
import BasicHeader from "../elements/BasicHeader";
import ModalSlideShow from "../elements/ModalSlideShow";
import PostCard from "../elements/PostCard";
import AntDesign from "react-native-vector-icons/AntDesign";
import BasicHorizontalFriend from "../elements/BasicHorizontalFriend";
import { ProfileInterface } from "@teiresource/commonconfig/AppInterface";
import { Modalize } from "react-native-modalize";
import FastImage from "react-native-fast-image";
import { AVATAR_DEFAULT } from "../../../assets/images";
const { width, height } = Dimensions.get('window');
const style = StyleSheet.create({
    settingContainer: { width: 25, height: 25, backgroundColor: white, borderRadius: 5, shadowColor: black, shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.5, elevation: 3 },
    avatarContainer: { padding: 3, backgroundColor: white, borderRadius: width, marginBottom: 20 },
    avatar: { width: width * 0.3, height: width * 0.3, borderRadius: width },
    relationShipButtonContainer: {borderWidth: 1, borderRadius: 5, borderColor: gray + 95, paddingVertical: 5, paddingHorizontal: 15, backgroundColor: black + "95"}
})
interface PropsInterface {
    data: Array<any>,
    commonMedia: Array<any>
    children?: ReactNode | JSX.Element | JSX.Element[],
    user: ProfileInterface,
    navigation?: any,
    friends?: Array<any>,
    countFriend: number,
    countPost: number,
    LoadPostFunction: Function,
    relationShip?: number
}

interface RenderItemPostInterface {
    item: PostInterface,
    index: number
}

function renderStatusToText(status: number){
    if(status == 1) return "Unfriend";
    if(status == 0) return "Wait request";
    if(status == -1) return "Request";
    return "";
}

export default function ProfileLayout(props: PropsInterface) {
    const modalizeRef = React.useRef<Modalize>(null);
    const [visible, setVisible] = React.useState<boolean>(false);
    const [dataSlideShow, setDataSlideShow] = React.useState<Array<any>>([]);
    const renderItem = (props: RenderItemPostInterface) => <PostCard onPressToImage={(data: any) => {
        setDataSlideShow([data]);
        setVisible(true);
    }} data={props.item} index={props.index} />
    const headerRender = React.useCallback(() => <View>
        <View style={[{ flex: 1, height: height * 0.4 }, AppStyle.center]}>
            <View style={style.avatarContainer}>
                <FastImage source={AVATAR_DEFAULT} style={style.avatar} />
            </View>
            <Text style={[AppStyle.h2, { color: white, fontWeight: 'normal' }, AppStyle.mb3]}>{props.user.name}</Text>
            {
                props.relationShip && props.relationShip != 3? <TouchableOpacity activeOpacity={0.8} style={style.relationShipButtonContainer}>
                    <Text style={{color: white}}>{ renderStatusToText(props.relationShip)  }</Text>
                </TouchableOpacity> : null
            }
            
        </View>
        <BasicHorizontalFriend data={props.friends ? props.friends : []} />
        <BasicCommonMedia navigation={props.navigation} data={props.commonMedia} />
    </View>, [props.data]);
    const onOpen = () => {
        modalizeRef.current?.open();
    };
    return <View style={[AppStyle.container, { backgroundColor: white }]}>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'light-content'} />
        <BasicHeader user={props.user} />
        <SafeAreaView style={{ flex: 1, }}>
            <View style={{ flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 15 }}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={[AppStyle.h4, { color: white }]}>{props.countFriend < 1000 ? props.countFriend : `${props.countFriend / 1000}k`}</Text>
                    <Text style={[AppStyle.p, { color: gray }]}>Friends</Text>
                </View>
                <View style={{ flex: 1 }}></View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={[AppStyle.h4, { color: white }]}>{props.countPost < 1000 ? props.countPost : `${props.countPost / 1000}k`}</Text>
                    <Text style={[AppStyle.p, { color: gray }]}>Posts</Text>
                </View>
            </View>
            <View style={{ flex: 1, overflow: 'hidden', borderTopEndRadius: 25, borderTopStartRadius: 25 }}>
                <FlatList
                    data={props.data}
                    extraData={(item: any, index: any) => `${index.toString()}-${item.id}`}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={18}
                    ListHeaderComponentStyle={{ borderTopStartRadius: 25, borderTopEndRadius: 25, overflow: 'hidden' }}
                    ListHeaderComponent={headerRender}
                    ListFooterComponent={() => <View style={{ marginBottom: height * 0.5 }} />}
                    onEndReached={() => {
                        props.LoadPostFunction()
                    }}
                />
            </View>
        </SafeAreaView>
        <ModalSlideShow data={dataSlideShow} visible={visible} onRequestClose={() => setVisible(false)} />
        <Modalize ref={modalizeRef}></Modalize>
    </View>
}