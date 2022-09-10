import React from "react";
import { Dimensions, Animated, Modal, View, StyleSheet, FlatList, Text, TouchableOpacity } from "react-native";
import { AppStyle } from "@teiresource/commonconfig/AppStyle";
import { black, gray, white } from "@teiresource/commonconfig/Colors";
import AntDesign from 'react-native-vector-icons/AntDesign'
const { width, height } = Dimensions.get('window');
const style = StyleSheet.create({
    itemContainer: { width: width, height: '100%' },
    itemImage: { width: '100%', height: '100%', resizeMode: 'contain' },
    closeButton: { backgroundColor: black, position: 'absolute', zIndex: 2, top: 55, right: 15, width: 35, height: 35, borderRadius: 25 }
});
interface ModalSlideShowInterface {
    data: Array<any>,
    visible?: boolean,
    onRequestClose?: Function,
    position?: number,
    isImage?: string
}
export default function ModalSlideShow(props: ModalSlideShowInterface) {
    const [visible, setVisible] = React.useState<boolean>(false);
    React.useEffect(() => {
        if (props.visible != null)
            setVisible(props.visible)
        if(props.position != null)
            scrollX.setValue(props.position * width)
    }, [props.visible]);
    const scrollX = React.useRef(new Animated.Value(0)).current
    const { data } = props;
    const onClose = () => {
        setVisible(false);
        if (props.onRequestClose)
            props.onRequestClose(false);
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
            <Animated.Image source={props.isImage? itemProps.item[`${props.isImage}`] : itemProps.item.image} style={[style.itemImage, { opacity }]} />
            {
                __DEV__ ? <Text style={{ position: 'absolute', bottom: 25, color: white, fontSize: 25, left: 15, fontWeight: 'bold' }}>{itemProps.index}</Text> : null
            }
        </View>
    }, [props.data]);
    return <Modal
        visible={visible}
        transparent
        animationType="fade"
        presentationStyle="overFullScreen"
        onRequestClose={onClose}
    >
        <View style={{ flex: 1, backgroundColor: black }}>
            <TouchableOpacity style={[style.closeButton, AppStyle.center]} onPress={onClose}>
                <AntDesign name="close" size={20} color={gray} />
            </TouchableOpacity>
            <Animated.FlatList
                data={data}
                keyExtractor={(item, index) => `[KEY MODAL SLIDE SHOW] ${index}`}
                renderItem={renderItem}
                initialNumToRender={60}
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                initialScrollIndex={props.position}
            />
        </View>
    </Modal>
}