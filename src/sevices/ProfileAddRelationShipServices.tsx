import React from "react";
import { SendRelationShipCommand } from "../command/SendRelationShipCommand";
import { RelationShipDescriptionEnum } from "../common/AppEnum";

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
    let sendRelationShipCommand = new SendRelationShipCommand(this);
    sendRelationShipCommand.beforeExecute(() => {
        this.setSending(true);
    });
    sendRelationShipCommand.afterExecute(() => {
        this.setSending(false);
    });
    sendRelationShipCommand.resolve((result: any) => {
        console.log(result);
    });
    return sendRelationShipCommand;
}