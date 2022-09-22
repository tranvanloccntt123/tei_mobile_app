import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, StatusBar, View, SafeAreaView } from "react-native";
import FastImage from "react-native-fast-image";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import { ScreenInterface } from "../common/AppInterface";
import { AppStyle } from "../common/AppStyle";
import { blue, gray, grayPrimary, orange, white } from "../common/Colors";
import { POST_CREATE_SCREEN } from "../common/RouteName";
import BasicProfile from "../components/profile/elements/BasicProfile";
import PostCard from "../components/profile/elements/PostCard";
import AppLayout from "../components/profile/layouts/AppLayout";
import { stateManagement, useLoadPost, useLoadProfile } from "../sevices/ProfileServices";
export default function ProfileScreen(this: any, props: ScreenInterface) {
    const navigation = useNavigation();
    stateManagement.call(this);
    useLoadProfile.call(this);
    useLoadPost.call(this);
    const onCreatePostPress = () => navigation.navigate(POST_CREATE_SCREEN, {});
    const RenderHeader = React.useCallback(() => <BasicProfile current={this.current}>
        <TouchableOpacity activeOpacity={0.8} style={[{ backgroundColor: blue, borderRadius: 35, paddingVertical: 10, width: 150 }, AppStyle.center]}>
            <Text style={[{ color: white }]}>Create post</Text>
        </TouchableOpacity>
    </BasicProfile>, [this.current]);
    return <AppLayout>
        <View style={[AppStyle.container, { backgroundColor: gray + 35 }]}>
            <FlatList
                ListHeaderComponent={RenderHeader}
                data={this.posts}
                keyExtractor={(item: any, index: any) => `[POSTS KEY] ${index}`}
                renderItem={(props: any) => <PostCard data={props.item} index={props.index} />}
                showsVerticalScrollIndicator={false}
            />
        </View>
    </AppLayout>
}