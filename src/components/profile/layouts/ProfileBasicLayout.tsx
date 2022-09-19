import React, { ReactNode } from "react";
import { View, StatusBar, Dimensions, StyleSheet, FlatList, SafeAreaView, Text, ImageBackground, TouchableOpacity } from "react-native";
import { AppStyle } from "../../../common/AppStyle";
import { black, blue, gray, white } from "../../../common/Colors";
import { CheckRelationInterface, PostInterface, ProfileInterface } from "../../../common/AppInterface";
import BasicCommonMedia from "../elements/BasicCommonMedia";
import BasicBackgroundHeader from "../elements/BasicBackgroundHeader";
import ModalSlideShow from "../elements/ModalSlideShow";
import PostCard from "../elements/PostCard";
import AntDesign from "react-native-vector-icons/AntDesign";
import BasicHorizontalFriend from "../elements/BasicHorizontalFriend";
import { Modalize } from "react-native-modalize";
import FastImage from "react-native-fast-image";
import { AVATAR_DEFAULT } from "../../../assets/images";
import BasicHeader from "../elements/BasicHeader";
const { width, height } = Dimensions.get('window');
const style = StyleSheet.create({
    settingContainer: { width: 25, height: 25, backgroundColor: white, borderRadius: 5, shadowColor: black, shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.5, elevation: 3 },
    avatarContainer: { padding: 3, backgroundColor: white, borderRadius: width, marginBottom: 20 },
    avatar: { width: width * 0.3, height: width * 0.3, borderRadius: width },
    relationShipButtonContainer: { borderWidth: 1, borderRadius: 5, marginLeft: 15, borderColor: gray + 95, paddingVertical: 5, paddingHorizontal: 15, backgroundColor: black + "95", justifyContent: "center" }
})
interface PropsInterface {
    data: Array<any>,
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

interface RenderItemPostInterface {
    item: PostInterface,
    index: number
}

export default function ProfileLayout(props: PropsInterface) {
    const modalizeRef = React.useRef<Modalize>(null);
    const [visible, setVisible] = React.useState<boolean>(false);
    const [dataSlideShow, setDataSlideShow] = React.useState<Array<any>>([]);
    const renderItem = React.useCallback((props: RenderItemPostInterface) => <PostCard onPressToImage={(data: any) => {
        setDataSlideShow([data]);
        setVisible(true);
    }} data={props.item} index={props.index} />, []);
    const headerRender = React.useCallback(() => <BasicHeader {...props} />, []);
    const onOpen = () => {
        modalizeRef.current?.open();
    };
    return <View style={[AppStyle.container, { backgroundColor: white }]}>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'light-content'} />
        <BasicBackgroundHeader user={props.user} />
        <SafeAreaView style={{ flex: 1, }}>
            <View style={{ flex: 1, overflow: 'hidden', borderTopEndRadius: 25, borderTopStartRadius: 25 }}>
                <FlatList
                    data={props.data}
                    extraData={(item: any, index: any) => `${index.toString()}-${item.id}`}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={18}
                    ListHeaderComponentStyle={{ borderTopStartRadius: 25, borderTopEndRadius: 25, overflow: 'hidden' }}
                    ListHeaderComponent={headerRender}
                    ListFooterComponent={() => <View style={{ marginBottom: 0 }} />}
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