import { User } from "react-native-gifted-chat";
import { STOREAGE } from "../common/ApiRoute";
import { ProfileInterface } from "../common/AppInterface";
import { CheckUrl } from "../common/Until";

type MessageFactoryType = 'user' | 'message';
export class MessageFactory{
    data: any;
    type: MessageFactoryType = 'user';
    constructor(type: MessageFactoryType, data: any){
        this.type = type;
        this.data = data;
    }
    build(){
        if(this.type == 'user')
        {
            let profile: ProfileInterface = this.data;
            let avatar: any = 'https://placeimg.com/140/140/any';
            if(profile.avatar){
                if(typeof profile.avatar == "string") avatar = CheckUrl(this.data.avatar)? this.data.avatar : `${STOREAGE}/${this.data.avatar}`;
                else avatar = CheckUrl(this.data.avatar.uri)? this.data.avatar.uri : `${STOREAGE}/${this.data.avatar.uri}`;
            }
            let user: User = {
                _id: `${profile.id}`,
                name: profile.name,
                avatar: avatar
            };
            return user;
        }
        return undefined;
    }
}