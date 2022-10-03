import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator, AppState, Dimensions, StyleSheet, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Dialog, Divider, List, Paragraph, Provider, Text, Button as ButtonPaper } from "react-native-paper";
import { CommandInvoker } from "../command/Command";
import { SendRelationShipCommand } from "../command/SendRelationShipCommand";
import { RelationShipDescriptionEnum } from "../common/AppEnum";
import { ScreenInterface } from "../common/AppInterface";
import { AppStyle } from "../common/AppStyle";
import { black, blue, gray, green, pink, red, violet, white } from "../common/Colors";
import Button from "../components/elements/Button";
import AppLayout from "../components/layouts/AppLayout";
import { renderSendRelationShipCommand, stateManagement } from "../sevices/ProfileAddRelationShipServices";
const { width, height } = Dimensions.get('window');
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
export default function ProfileAddRelationShipScreen(this: any, props: ScreenInterface) {
    const navigation = useNavigation();
    const scrollRef = React.useRef<any>();
    stateManagement.call(this);
    let selectRelationShip = ['friend', 'daughter', 'husband', 'wife', 'son', 'grandfather', 'grandmother', 'father', 'mother', 'lover'];
    let titleRelationShip = ['Bạn', 'Con gái', 'Chồng', 'Vợ', 'Con trai', 'Ông', 'Bà', 'Bố', 'Mẹ', 'Người yêu'];
    const onSelectRelationShip = (item: any) => {
        this.setSelected(item);
        scrollRef.current?.scrollTo({ x: width, y: 0, animated: true });
    }
    let sendRelationShipCommand = renderSendRelationShipCommand.call(this);
    const disableButton = () => !sendRelationShipCommand.canExecute({id: props.route.params.id ,description: this.selected, day: this.day, month: this.month, year: this.year});
    const onSendRequest = () => CommandInvoker(sendRelationShipCommand, {id: props.route.params.id, description: this.selected, day: this.day, month: this.month, year: this.year});
    return <Provider>
        <AppLayout>
            <ScrollView scrollEnabled={false} showsHorizontalScrollIndicator={false} ref={(ref) => scrollRef.current = ref} horizontal>
                <View style={{ width: width, height: height }}>
                    {
                        selectRelationShip.map((item: any, index: any) => <View key={item} >
                            <List.Item onPress={() => onSelectRelationShip(item)} title={titleRelationShip[index]} />
                            <Divider />
                        </View>)
                    }
                </View>
                <View style={{ width: width, height: height }}>
                    <Text style={[AppStyle.h3, AppStyle.m3]}>Start Day</Text>
                    <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                        <View style={[{ flex: 1 }, AppStyle.center, AppStyle.p3]}>
                            <TextInput value={this.day} onChangeText={this.setDay} placeholder="0x" style={style.input} maxLength={2} />
                            <Text style={AppStyle.h5}>Ngày</Text>
                        </View>
                        <View style={[{ flex: 1 }, AppStyle.center, AppStyle.p3]}>
                            <TextInput value={this.month} onChangeText={this.setMonth} placeholder="0x" style={style.input} maxLength={2} />
                            <Text style={AppStyle.h5}>Tháng</Text>
                        </View>
                        <View style={[{ flex: 1.5 }, AppStyle.center, AppStyle.p3]}>
                            <TextInput value={this.year} onChangeText={this.setYear} placeholder="1xxx" style={style.input} maxLength={4} />
                            <Text style={AppStyle.h5}>Năm</Text>
                        </View>
                    </View>
                    <View style={AppStyle.p3}>
                        <Button disabled={disableButton()} buttonStyle={{backgroundColor: disableButton()? gray : blue}} onPress={onSendRequest} label="Send Request" childrenLeft={this.visible ? <ActivityIndicator style={AppStyle.ml3} color={white} /> : null} />
                    </View>
                </View>
            </ScrollView>
            <Dialog style={{borderRadius: 30, backgroundColor: white}} visible={this.visible}>
                <Dialog.Title style={{color: black}}>Cảnh báo</Dialog.Title>
                <Dialog.Content>
                    <Paragraph style={{color: black}}>This is simple dialog</Paragraph>
                </Dialog.Content>
                <Dialog.Actions style={[AppStyle.ml3, AppStyle.mr3]}>
                    <ButtonPaper labelStyle={{color: red}} onPress={() => this.setVisible(false)}>Cancel</ButtonPaper>
                    <ButtonPaper labelStyle={{color: green}} onPress={() => {}}>Accept</ButtonPaper>
                </Dialog.Actions>
            </Dialog>
        </AppLayout>
    </Provider>
}