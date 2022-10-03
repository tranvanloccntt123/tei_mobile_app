import React from "react";
import { View, TextInput, StyleSheet, FlatList } from "react-native";
import { AppStyle } from "../common/AppStyle";
import { gray, green } from "../common/Colors";
import AppLayout from "../components/layouts/AppLayout";
import Icon from 'react-native-vector-icons/Feather';
import { ProfileInterface } from "../common/AppInterface";
import { searchUser } from "../common/Until";
import { AVATAR_DEFAULT } from "../assets/images";
import { Avatar, List } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { PROFILE_INFO_SCREEN } from "../common/RouteName";
import { COMBINE_NAME_PROFILE } from "../redux/reducers/CombineName";
import { useSelector } from "react-redux";
const style = StyleSheet.create({
    searchContainer: {height: 60,  backgroundColor: gray+75, borderBottomWidth: 0, borderRadius: 15, flexDirection: "row"}
});
export default function ProfileFindUserScreen(){
    let timeout = React.useRef(0);
    const profile: ProfileInterface = useSelector((state: any) => state[`${COMBINE_NAME_PROFILE}`].user);
    const [keyword, setKeyWord] = React.useState<string>("");
    const [data, setData] = React.useState<Array<ProfileInterface>>([]);
    const navigation = useNavigation();
    const getData = async () => {
        let r = await searchUser(keyword);
        if(r)
            setData(r.users.map((value: any) => {
                return {
                    id: value.id,
                    name: value.name,
                    avatar: AVATAR_DEFAULT,
                    description: value.description,
                    email: value.email
                }
            }))
    }
    React.useEffect(() => {
        if(timeout.current)
            clearTimeout(timeout.current);
        if(keyword){
            timeout.current = setTimeout(getData, 1000);
        }
    }, [keyword]);
    const renderItem = React.useCallback((propItem: any) => <List.Item 
        onPress={() => navigation.navigate(PROFILE_INFO_SCREEN as never, {visit: propItem.item.id != profile.id, id: propItem.item.id} as never)}
        left={() => <Avatar.Image style={{backgroundColor: gray}} size={55} source={propItem.item.avatar}  />} 
        title={propItem.item.name} 
        description={propItem.item.email? propItem.item.email : "Kết nối với tôi" }
    />, 
    [data]);
    return <AppLayout>
        <View style={[AppStyle.m3, style.searchContainer]}>
            <Icon name="search" size={25} color={gray} style={[{alignSelf: "center"}, AppStyle.m3]} />
            <TextInput value={keyword} onChangeText={setKeyWord} placeholder="Nhập vào từ khoá tìm kiếm" style={[AppStyle.pl2, AppStyle.pr3, {flex: 1, fontSize: 18}]} />
        </View>
        <FlatList 
            data={data}
            keyExtractor={(item, index) => `[FIND KEY] ${index}`}
            renderItem={renderItem}
            extraData={data}
        />
    </AppLayout>
}