import { User } from "react-native-gifted-chat";
import { STOREAGE } from "../common/ApiRoute";
import { ProfileInterface } from "../common/AppInterface";

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
            let user: User = {
                _id: `${profile.id}`,
                name: profile.name,
                avatar: profile.avatar? `${STOREAGE}/${this.data.avatar}` : 'https://placeimg.com/140/140/any'
            };
            return user;
        }
        return undefined;
    }
}