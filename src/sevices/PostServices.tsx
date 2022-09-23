import React from "react";
import { Asset } from "react-native-image-picker";
import { LauchImage } from "../untils/CameraUntil";

export function stateManagement(this: any, route: any) {
    const [mode, setMode] = React.useState<boolean>(route.params.mode != undefined ? route.params.mode : true);
    const [modeTitle, setModeTitle] = React.useState<string>("Create");
    const [visible, setVisible] = React.useState<boolean>(false);
    const [content, setContent] = React.useState(route.params.post ? route.params.post.content : "");
    const [file, setFile] = React.useState<Asset | null>(null);
    const [uuid, setUUID] = React.useState<string | null>(route.params.post ? route.params.post.uuid : "");
    const [oldImage, setOldImage] = React.useState(route.params.post && route.params.post.image? route.params.post.image : null);

    this.mode = mode;
    this.setMode = setMode;
    this.modeTitle = modeTitle;
    this.setModeTitle = setModeTitle;
    this.visible = visible;
    this.setVisible = setVisible;
    this.content = content;
    this.setContent = setContent;
    this.file = file;
    this.setFile = setFile;
    this.uuid = uuid;
    this.setUUID = setUUID;
    this.oldImage = oldImage;
    this.setOldImage = setOldImage;

    React.useEffect(() => {
        this.setModeTitle(this.mode ? "Create" : "Update");
    }, [this.mode]);
}

export function useSelectImage(this: any) {
    let props = this;
    LauchImage(function () {
    }, function (result: Asset[]) {
        if (result[0])
            props.setFile(result[0]);
    });
}