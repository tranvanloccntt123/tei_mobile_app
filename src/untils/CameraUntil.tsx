import { launchImageLibrary, ImageLibraryOptions, launchCamera } from "react-native-image-picker";
const imageOption:ImageLibraryOptions = {
    mediaType: "photo",
    presentationStyle: "overFullScreen"
}
export const LauchImage = (before?: Function, callback?: Function) => {
    if(before) before()
    launchImageLibrary(imageOption).then(result => {
        if(result.didCancel) return
        if(callback)
            callback(result.assets)
    }).catch(e => {
        console.error(e)
    })
}

export const CaptureImage = (before?: Function, callback?: Function) => {
    if(before) before()
    launchCamera(imageOption).then(result => {
        if(result.didCancel) return
        if(callback)
            callback(result.assets)
    }).catch(e => {
        console.error(e)
    })
}