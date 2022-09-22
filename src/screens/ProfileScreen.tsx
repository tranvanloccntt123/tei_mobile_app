import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { ScreenInterface } from "../common/AppInterface";
import { AppStyle } from "../common/AppStyle";
import { black, blue, gray, grayPrimary, red, white } from "../common/Colors";
import { POST_CREATE_SCREEN, PROFILE_EDIT_SCREEN } from "../common/RouteName";
import BasicProfile from "../components/profile/elements/BasicProfile";
import PostCard from "../components/profile/elements/PostCard";
import AppLayout from "../components/layouts/AppLayout";
import { sendDeletePost, stateManagement, useLoadPost } from "../sevices/ProfileServices";
import { Modalize } from "react-native-modalize";
import Feather from 'react-native-vector-icons/Feather';
const style = StyleSheet.create({
    createPostButtonContainer: { backgroundColor: blue, borderRadius: 35, width: 150, height: 45, shadowColor: blue, shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.5, elevation: 5 },
    actionButtonContainer: {width: 45, height: 45, borderRadius: 45, elevation: 5, shadowOpacity: 0.3, shadowOffset: {width: 0, height: 2}}
});
export default function ProfileScreen(this: any, props: ScreenInterface) {
    
    const navigation = useNavigation();

    stateManagement.call(this);

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

    const onCreatePostPress = () => navigation.navigate(POST_CREATE_SCREEN as never, {} as never);

    const onEditProfilePress = () => navigation.navigate(PROFILE_EDIT_SCREEN as never);

    const RenderHeader = React.useCallback(() => <BasicProfile countPost={this.countPost} countFriend={this.countFriend} current={this.current}>
        <View style={[{flexDirection: "row"}, AppStyle.center]}>
            <TouchableOpacity onPress={onCreatePostPress} activeOpacity={0.8} style={[style.createPostButtonContainer, AppStyle.center, AppStyle.mr3]}>
                <Text style={[{ color: white }]}>Create post</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onEditProfilePress} activeOpacity={0.8} style={[style.actionButtonContainer, AppStyle.center, {backgroundColor: red, shadowColor: red}]}>
                <Feather name="edit" size={20} color={white} />
            </TouchableOpacity>
        </View>
    </BasicProfile>, [this.posts]);
    const renderItem = React.useCallback((props: any) => <PostCard onPressInfo={() => onOpen(props.item, props.index)} data={props.item} index={props.index} />, [this.posts]);
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
    </AppLayout>
}