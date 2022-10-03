import { AVATAR_DEFAULT } from "../assets/images";
import { STOREAGE } from "../common/ApiRoute";
import { ProfileInterface, UserInterface } from "../common/AppInterface";

type UserFactoryType = 'UserInterface' | 'ProfileInterface';
export class UserFactory{
    data: any;
    type: UserFactoryType = 'ProfileInterface';
    constructor(type: UserFactoryType, data: any){
        this.type = type;
        this.data = data;
    }
    build() : any{
        if(this.type == "ProfileInterface"){
            let profile: ProfileInterface = this.data;
            profile.avatar = this.data.avatar && typeof this.data.avatar != "object"? {uri: `${STOREAGE}/${this.data.avatar}`} : AVATAR_DEFAULT;
            return profile;
        }
        if(this.type == "UserInterface"){
            let profile: UserInterface = this.data;
            profile.avatar = this.data.avatar? {uri: `${STOREAGE}/${this.data.avatar}`} : AVATAR_DEFAULT;
            return profile;
        }
        return undefined;
    }
}