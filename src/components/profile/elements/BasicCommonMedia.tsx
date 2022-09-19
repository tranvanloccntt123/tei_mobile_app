import React from "react";
import { Text, View, StyleSheet, Animated, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AppStyle } from "../../../common/AppStyle";
import { black, blue, gray, white } from "../../../common/Colors";
import { AVATAR_DEFAULT } from "../../../assets/images";
import { CommonMediaInterface } from "../../../common/AppInterface";
import BasicCommonMediaItem from "./BasicCommonMediaItem";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { POST_CREATE_SCREEN, PROFILE_MODAL_SCREEN } from "../../../common/RouteName";
import { useNavigation } from "@react-navigation/native";
const style = StyleSheet.create({
    container: { width: '100%', backgroundColor: white, paddingTop: 25, paddingBottom: 35 },
    commonHeaderContainer: {
        width: 120,
        height: 170,
        shadowColor: black,
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.5,
        elevation: 3,
        borderWidth: 1,
        borderColor: gray,
        marginLeft: 8,
        borderRadius: 15,
        backgroundColor: white,
        overflow: 'hidden',
    }
});
interface BasicCommonMediaProps {
    data: Array<CommonMediaInterface>,
    navigation?: any
}
export default function BasicCommonMedia(props: BasicCommonMediaProps) {
    const navigation = useNavigation();
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const CommonImageView = (commonImageViewProps: { item: CommonMediaInterface, index: any }) => <BasicCommonMediaItem onPress={(index: any) => {
        navigation.navigate(PROFILE_MODAL_SCREEN as never, { data: props.data.map(value => value), position: index } as never)
    }} {...commonImageViewProps} />
    const onCreatePost = () => {
        navigation.navigate(POST_CREATE_SCREEN as never, {} as never)
    }
    const ListHeaderComponent = React.useCallback(() => {
        return <TouchableOpacity onPress={onCreatePost} activeOpacity={0.9}>
            <ImageBackground source={AVATAR_DEFAULT} style={style.commonHeaderContainer}>
                <View style={{ flex: 1.5 }}></View>
                <View style={{ flex: 1, backgroundColor: white }}>
                    <View style={[{ flex: 1 }, AppStyle.center]}>
                        <View style={[{ width: 20, height: 20, borderRadius: 30, backgroundColor: blue }, AppStyle.center]}>
                            <AntDesign name="plus" size={15} color={white} />
                        </View>
                    </View>
                    <Text style={{ textAlign: 'center', marginBottom: 5, fontWeight: 'bold' }}>Create post</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    }, []);
    return <View style={[style.container]}>
        <View style={[{flexDirection: 'row'}, AppStyle.m3]}>
            <Text style={[AppStyle.h3, {flex: 1}]}>Medias</Text>
            <TouchableOpacity activeOpacity={0.8} style={{alignSelf: 'center'}}>
                <Text style={{color: blue}}>See all</Text>
            </TouchableOpacity>
        </View>
        <Animated.FlatList
            data={props.data}
            extraData={props.data}
            renderItem={CommonImageView}
            horizontal
            scrollEventThrottle={18}
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true }
            )}
            pagingEnabled
            snapToInterval={props.data.length}
            decelerationRate={0}
            bounces={false}
            contentContainerStyle={{ alignItems: 'center' }}
            ListHeaderComponent={ListHeaderComponent}
        />
    </View>
}