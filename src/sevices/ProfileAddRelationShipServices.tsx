import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useDispatch } from "react-redux";
import { SendRelationShipCommand } from "../command/SendRelationShipCommand";
import { RelationShipDescriptionEnum } from "../common/AppEnum";
import { RELATION_ACTION_SET } from "../redux/actions/RelationAction";
import { saveRelationShipToStorage, setCacheRelationShip } from "../untils/RelationShipUntil";

export function stateManagement(this: any){
    const [visible, setVisible] = React.useState<boolean>(false);
    const [sending, setSending] = React.useState<boolean>(false);
    const [message, setMessage] = React.useState<string>("");
    const [selected, setSelected] = React.useState<RelationShipDescriptionEnum | null>(null);
    const [day, setDay] = React.useState("");
    const [month, setMonth] = React.useState("");
    const [year, setYear] = React.useState("");

    this.visible = visible;
    this.setVisible = setVisible;
    this.selected = selected;
    this.setSelected = setSelected;
    this.day = day;
    this.setDay = setDay;
    this.month = month;
    this.setMonth = setMonth;
    this.year = year;
    this.setYear = setYear;
    this.sending = sending;
    this.setSending = setSending;
    this.message = message;
    this.setMessage = setMessage;
}

export function renderSendRelationShipCommand(this: any){
    const navigation = useNavigation();
    const dispatch = useDispatch();
    let sendRelationShipCommand = new SendRelationShipCommand(this);
    sendRelationShipCommand.beforeExecute(() => {
        this.setSending(true);
    });
    sendRelationShipCommand.afterExecute(() => {
        this.setSending(false);
    });
    sendRelationShipCommand.resolve(async (result: any) => {
        let r = result.relation;
        dispatch({type: RELATION_ACTION_SET, userId: r.friend, relation: r.description});
        await saveRelationShipToStorage(r.description, r.friend, r.start);
        navigation.goBack();
    });
    return sendRelationShipCommand;
}