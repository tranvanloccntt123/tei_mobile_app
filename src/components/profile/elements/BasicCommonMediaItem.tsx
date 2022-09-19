import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { black } from "../../../common/Colors";
import { CommonMediaInterface } from "../../../common/AppInterface";
interface BasicCommonMediaItemProps {
    item: CommonMediaInterface,
    index: any,
    onPress: Function
}
const ITEM_SIZE = 130
const style = StyleSheet.create({
    mediaContainer: {
        width: ITEM_SIZE,
        height: 180,
        shadowColor: black,
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.5,
        elevation: 3,
        padding: 5
    },
    commonImage: {
        width: '100%',
        height: '100%',
        maxHeight: 300,
        borderRadius: 8
    }
});
export default function BasicCommonMediaItem(props: BasicCommonMediaItemProps) {
    const { item, index } = props;
    const onPress = () => {
        props.onPress(index)
    }
    return <View key={`[KEY] Common Media ${index}`} style={[style.mediaContainer]}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
            <Image source={item.image} style={style.commonImage} />
        </TouchableOpacity>
    </View>
}