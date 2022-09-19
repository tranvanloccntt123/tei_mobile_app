import { getRelationShipName } from "@teiresource/commonconfig/AppEnum";
import { ProfileInterface, PostInterface, UserInterface } from "@teiresource/commonconfig/AppInterface";
import { sendRelationShip } from "@teiresource/commonconfig/Until";
import React from "react";
import { DEV_BACKGROUND } from "../assets/images";
import { CommonMediaInterface } from "../common/PostInterface";
import { ScreenInterface } from "../common/ScreenInterface";
import ProfileLayout from "../components/profile/layouts/ProfileBasicLayout";
import { useLoadPost, useLoadProfile, useProfileSevices } from "../sevices/ProfileServices";
export default function ProfileScreen(props: ScreenInterface){
    const user_id: number = props.route? props.route.id? props.route.id : 5 : 5;
    const [current, setCurrent] = React.useState<ProfileInterface>();
    const [countFriend, setCountFriend] = React.useState<number>(0);
    const [countPost, setCountPost] = React.useState<number>(0);
    const [friends, setFriends] = React.useState<Array<UserInterface>>([]);
    const [relationShip, setRelationShip] = React.useState<number>(3);
    const [posts, setPosts] = React.useState<Array<PostInterface>>([]);
    const [isLoad, setIsLoad] = React.useState<boolean>(true);
    useLoadProfile();
    useProfileSevices(user_id, setCountFriend, setCountPost, setCurrent, setFriends, setRelationShip);
    useLoadPost(isLoad, setIsLoad, posts, setPosts);
    const common:Array<CommonMediaInterface> = Array.from({length: 10}, (_, i) => {
        return {
            id: i,
            image: DEV_BACKGROUND
        }
    });

    const handleRelationShip = async () => {
        //let r = await sendRelationShip(user_id, getRelationShipName())
    }

    return current? <ProfileLayout 
        user={current}
        data={posts} 
        friends={friends}
        commonMedia={common}
        navigation={props.navigation}
        countFriend={countFriend}
        countPost={countPost}
        LoadPostFunction={() => setIsLoad(true)}
        relationShip={relationShip}
    /> : null
}