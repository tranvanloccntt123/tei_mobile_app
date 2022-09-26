import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { ScreenInterface } from "../common/AppInterface";
import { AppStyle } from "../common/AppStyle";
import { black, gray, red, white } from "../common/Colors";
import { POST_CREATE_SCREEN, PROFILE_EDIT_SCREEN } from "../common/RouteName";
import BasicProfile from "../components/elements/BasicProfile";
import PostCard from "../components/elements/PostCard";
import AppLayout from "../components/layouts/AppLayout";
import { sendDeletePost, stateManagement, useLoadPost } from "../sevices/ProfileServices";
import { Modalize } from "react-native-modalize";
import Feather from 'react-native-vector-icons/Feather';
import ModalSlideShow from "../components/elements/ModalSlideShow";
export default function ProfileScreen(this: any, props: ScreenInterface) {
    
    const navigation = useNavigation();

    stateManagement.call(this, props.route);

    useLoadPost.call(this);

    const modalizeRef = React.useRef<Modalize>(null);

    const onOpen = (item: any, index: any) => {
        this.setPickPost(item);
        modalizeRef.current?.open();
    };

    const deletePost = async () => {
        modalizeRef.current?.close();
        sendDeletePost.call(this);
    }

    const editPost = () => {
        modalizeRef.current?.close();
        navigation.navigate(POST_CREATE_SCREEN as never, {mode: false, post: this.pickPost} as never);
    }

    const RenderHeader = React.useCallback(() => <BasicProfile 
        visit={this.visit}
        countPost={this.countPost} 
        countFriend={this.countFriend} 
        current={this.current}
        user_id={this.user_id}/>, 
    [this.current]);
    const renderItem = React.useCallback((props: any) => <PostCard 
        onPressToImage={() => {
            console.log(props.item);
            this.setDataShowModal([props.item]);
            this.setVisibleShowModal(true);
        }} 
        onPressInfo={() => onOpen(props.item, props.index)} 
        data={props.item} 
        index={props.index} 
    />, [this.posts]);
    const refresh = () => {
        this.setPosts([]);
        this.setIsLoad(true);
    }
    return <AppLayout>
        <View style={[AppStyle.container, { backgroundColor: gray + 35 }]}>
            <FlatList
                onRefresh={refresh}
                refreshing={false}
                ListHeaderComponent={RenderHeader}
                data={this.posts}
                extraData={this.posts}
                keyExtractor={(item: any, index: any) => `[POSTS KEY] ${index} ${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                onEndReached={() => this.setIsLoad(true)}
            />
        </View>
        <Modalize adjustToContentHeight={true} ref={modalizeRef}>
            <View style={[AppStyle.pt3]}>
                <TouchableOpacity onPress={editPost} activeOpacity={0.8} style={[{backgroundColor: white, padding: 15}, AppStyle.center]}>
                    <View style={{flexDirection: "row"}}>
                        <Feather name="edit" size={20} color={black} />
                        <Text style={[AppStyle.h5, AppStyle.ml2, {color: black}]}>Edit</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={deletePost} activeOpacity={0.8} style={[{backgroundColor: red, padding: 15}, AppStyle.center]}>
                    <View style={{flexDirection: "row"}}>
                        <Feather name="trash-2" size={20} color={white} />
                        <Text style={[AppStyle.h5, AppStyle.ml2, {color: white}]}>Delete</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Modalize>
        <ModalSlideShow visible={this.visibleShowModal} onRequestClose={() => this.setVisibleShowModal(false)} data={this.dataShowModal} />
    </AppLayout>
}