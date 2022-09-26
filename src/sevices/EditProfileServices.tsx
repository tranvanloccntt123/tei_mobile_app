import React from "react";

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