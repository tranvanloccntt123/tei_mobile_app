import { BaseApiResponseInterface } from "@teiresource/commonconfig/AppInterface"
import { ImageProps, ImageSourcePropType } from "react-native"

export interface CommonMediaInterface extends BaseApiResponseInterface{
    image: ImageSourcePropType
}