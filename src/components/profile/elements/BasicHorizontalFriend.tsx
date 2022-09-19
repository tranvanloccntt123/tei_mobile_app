import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { white, gray, black, blue, red } from '../../../common/Colors';
import { AppStyle } from '../../../common/AppStyle';
import { UserInterface } from "../../../common/AppInterface";
import { FlatList } from "react-native-gesture-handler";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { PROFILE_FIND_SCREEN } from "../../../common/RouteName";
const style = StyleSheet.create({
    container: {
        width: '100%', 
        backgroundColor: white, 
        paddingTop: 25, 
        paddingBottom: 15,
        borderTopEndRadius: 25, 
        borderTopStartRadius: 25
    },
    avatarContainer: { 
        padding: 3, 
        backgroundColor: white, 
        borderRadius: 35, 
        marginBottom: 20,  
        borderWidth: 1, 
        borderColor: gray,
        shadowColor: black,
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        elevation: 3
    },
    avatar: { width: 55, height: 55, borderRadius: 55 }
});
interface BasicHorizontalFriendProps{
    data: Array<any>,
    isVisit: boolean
}
export default function BasicHorizontalFriend(props: BasicHorizontalFriendProps){
    const [data, setData] = React.useState<Array<UserInterface>>(props.data);
    const navigation = useNavigation();
    const renderItem = React.useCallback((props: {item: any, index: number}) => <TouchableOpacity activeOpacity={0.5} style={[AppStyle.mr3]}>
    <View style={[style.avatarContainer]}>
        <Image source={props.item.avatar} style={style.avatar} />
    </View>
</TouchableOpacity>, []);
    const ListHeaderComponent = React.useCallback(() => {
        const onPress = () => {
            navigation.navigate(PROFILE_FIND_SCREEN, {});
        }
        return !props.isVisit? <View style={[AppStyle.ml3]}>
            <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={[AppStyle.mr3]}>
                <View style={[style.avatarContainer, {shadowOpacity: 0, elevation: 0, borderColor: red}]}>
                    <View style={[style.avatar, AppStyle.center, {backgroundColor: red + 90}]}>
                        <AntDesign name="plus" size={25} color={white} />
                    </View>
                </View>
            </TouchableOpacity>
        </View> : null
    }, [props.isVisit]);
    return <View style={style.container}>
        <View style={[{flexDirection: 'row'}, AppStyle.m3]}>
            <Text style={[AppStyle.h3, {flex: 1}]}>Friends</Text>
            {
                props.data.length > 0? <TouchableOpacity activeOpacity={0.8} style={{ alignSelf: 'center' }}>
                    <Text style={{ color: blue }}>See all</Text>
                </TouchableOpacity> : null
                }
        </View>
        <FlatList
            data={data}
            extraData={data}
            keyExtractor={(item, index) => `[KEY] Friend ${index}`}
            renderItem={renderItem}
            ListHeaderComponent={ListHeaderComponent}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={() => <View>
                <Text style={[AppStyle.h5, {color: gray, fontWeight: "bold"}]}>Friend list is empty</Text>
                <Text style={[AppStyle.p1, {color: black}]}>Connect with people</Text>
            </View>}
        />
    </View>
}