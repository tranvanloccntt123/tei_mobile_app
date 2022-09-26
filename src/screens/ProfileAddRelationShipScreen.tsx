import React from "react";
import { ActivityIndicator, AppState, Dimensions, StyleSheet, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Divider, List, Text } from "react-native-paper";
import { RelationShipDescriptionEnum } from "../common/AppEnum";
import { AppStyle } from "../common/AppStyle";
import { gray, red, white } from "../common/Colors";
import Button from "../components/elements/Button";
import AppLayout from "../components/layouts/AppLayout";
const {width, height} = Dimensions.get('window');
const style = StyleSheet.create({
    input: {
        backgroundColor: gray + 90, 
        width: "100%", 
        textAlign: "center", 
        height: 45, 
        borderRadius: 15, 
        marginBottom: 15,
        fontSize: 20,
        fontWeight: "bold"
    }
})
export default function ProfileAddRelationShipScreen(){
    const scrollRef = React.useRef<any>();
    const [visible, setVisible] = React.useState<boolean>(false);
    const [selected, setSelected] = React.useState<RelationShipDescriptionEnum | null>(null);
    const [day, setDay] = React.useState("");
    const [month, setMonth] = React.useState("");
    const [year, setYear] = React.useState("");
    let selectRelationShip = ['friend', 'daughter', 'husband', 'wife', 'son', 'grandfather', 'grandmother', 'father', 'mother', 'lover'];
    const onSelectRelationShip = (item: any) => {
        setSelected(item);
        scrollRef.current?.scrollTo({x: width, y: 0, animated: true});
    }
    const onSenRequest = async () => {
        setVisible(true);
        let date = new Date();
        setVisible(false);
    }
    return <AppLayout>
        <ScrollView scrollEnabled={false} showsHorizontalScrollIndicator={false} ref={(ref) => scrollRef.current = ref} horizontal>
            <View style={{width: width, height: height}}>
                {
                    selectRelationShip.map((item: any) => <View key={item} >
                        <List.Item onPress={() => onSelectRelationShip(item)} title={item} />
                        <Divider />
                    </View>)
                }
            </View>
            <View style={{width: width, height: height}}>
                <Text style={[AppStyle.h3, AppStyle.m3]}>Start Day</Text>
                <View style={{flexDirection: "row", alignItems: "flex-start"}}>
                    <View style={[{flex: 1}, AppStyle.center, AppStyle.p3]}>
                        <TextInput value={day} onChangeText={setDay} placeholder="0x" style={style.input} maxLength={2} />
                        <Text style={AppStyle.h5}>Day</Text>
                    </View>
                    <View style={[{flex: 1}, AppStyle.center, AppStyle.p3]}>
                        <TextInput value={month} onChangeText={setMonth} placeholder="0x" style={style.input} maxLength={2} />
                        <Text style={AppStyle.h5}>Month</Text>
                    </View>
                    <View style={[{flex: 1.5}, AppStyle.center, AppStyle.p3]}>
                        <TextInput value={year} onChangeText={setYear} placeholder="1xxx" style={style.input} maxLength={4} />
                        <Text style={AppStyle.h5}>Year</Text>
                    </View>
                </View>
                <View style={AppStyle.p3}>
                    <Button onPress={onSenRequest} label="Send Request" childrenLeft={visible? <ActivityIndicator style={AppStyle.ml3} color={white} /> : null} />
                </View>
            </View>
        </ScrollView>
    </AppLayout>
}