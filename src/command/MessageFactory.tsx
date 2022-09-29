import { User } from "react-native-gifted-chat";
import { ProfileInterface } from "../common/AppInterface";

type MessageFactoryType = 'user' | 'message';
export class MessageFactory{
    data: any;
    type: MessageFactoryType = 'user';
    constructor(type: MessageFactoryType, data: any){
        this.type = type;
        data = data;
    }
    build(){
        if(this.type == 'user')
        {
            let profile: ProfileInterface = this.data;
            let user: User = {
                _id: profile.id,
                name: profile.name,
                avatar: 'https://placeimg.com/140/140/any'
            };
            return user;
        }
        return null;
    }
}