import React from "react";
import { View, TouchableOpacity, Animated, StyleSheet, Dimensions, Text } from "react-native";
import { AppStyle } from "../../../common/AppStyle";
import { black, gray, white } from "../../../common/Colors";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScreenInterface } from "../../../common/AppInterface";
const { width } = Dimensions.get('window');
const style = StyleSheet.create({
    itemContainer: { width: width, height: '100%' },
    itemImage: { width: '100%', height: '100%', resizeMode: 'contain' },
    closeButton: { backgroundColor: black, position: 'absolute', zIndex: 2, top: 55, right: 15, width: 35, height: 35, borderRadius: 25 }
});
export default function ProfileModalLayout(props: ScreenInterface) {
    const {position, data} = props.route?.params;
    const scrollX = React.useRef(new Animated.Value(0)).current
    const onClose = () => {
        props.navigation?.goBack();
    }
    const renderItem = React.useCallback((itemProps: { item: any, index: any }) => {
        const inputRange = [(itemProps.index - 1) * width, itemProps.index * width, (itemProps.index + 1) * width]
        const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [
                0.3, 1, 0.3
            ]
        })
        return <View style={[style.itemContainer]}>
            <Animated.Image source={itemProps.item.image} style={[style.itemImage, { opacity }]} />
            {
                __DEV__ ? <Text style={{ position: 'absolute', bottom: 25, color: white, fontSize: 25, left: 15, fontWeight: 'bold' }}>{itemProps.index}</Text> : null
            }
        </View>
    }, [data]);
    return <View style={[AppStyle.container, { backgroundColor: black }]}>
        <TouchableOpacity style={[style.closeButton, AppStyle.center]} onPress={onClose}>
            <AntDesign name="close" size={20} color={gray} />
        </TouchableOpacity>
        <Animated.FlatList
            data={data}
            keyExtractor={(item, index) => `[KEY MODAL SLIDE SHOW] ${index}`}
            renderItem={renderItem}
            initialNumToRender={1}
            horizontal
            pagingEnabled
            scrollEventThrottle={16}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true }
            )}
            initialScrollIndex={position}
        />
    </View>
}