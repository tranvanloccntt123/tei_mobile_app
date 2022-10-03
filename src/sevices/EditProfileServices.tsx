import React from "react";
import { useDispatch } from "react-redux";
import { SaveProfileCommand } from "../command/SaveProfileCommand";
import { PROFILE_ACTION_SET_USER } from "../redux/actions/ProfileAction";

export function stateManagement(this: any){
    const [errorName, setErrorName] = React.useState<string>("");
    const [errorEmail, setErrorEmail] = React.useState<string>("");
    const [errorDescription, setErrorDescription] = React.useState<string>("");
    const [alter, setAlter] = React.useState<string>("");
    const [alterId, setAlterId] = React.useState(0);
    const [alterStatus, setAlterStatus] = React.useState(0);

    this.errorName = errorName;
    this.setErrorName = setErrorName;
    this.errorEmail = errorEmail;
    this.setErrorEmail = setErrorEmail;
    this.errorDescription = errorDescription;
    this.setErrorDescription = setErrorDescription;
    this.alter = alter;
    this.setAlter = setAlter;
    this.alterId = alterId;
    this.setAlterId = setAlterId;
    this.alterStatus = alterStatus;
    this.setAlterStatus = setAlterStatus;
}

export function renderSaveProfileCommand(this: any){
    const dispatch = useDispatch();
    let saveProfileCommand = new SaveProfileCommand(this);
    saveProfileCommand.reject(() => {
        this.setAlterStatus(0);
        this.setAlter("Cập nhật thông tin thất bại");
        this.setAlterId(this.context.alterId + 1);
    });

    saveProfileCommand.resolve((result: any) => {
        dispatch({type: PROFILE_ACTION_SET_USER, user: result});
        this.setAlterStatus(1);
        this.setAlter("Thông tin cá nhân đã được cập nhật");
        this.setAlterId(this.alterId + 1);
    })
    return saveProfileCommand;
}