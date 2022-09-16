import { ProfileInterface, PostInterface, UserInterface } from "@teiresource/commonconfig/AppInterface";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AVATAR_DEFAULT, DEV_BACKGROUND } from "../assets/images";
import { CommonMediaInterface } from "../common/PostInterface";
import { ScreenInterface } from "../common/ScreenInterface";
import ProfileLayout from "../components/profile/layouts/ProfileBasicLayout";
import { PROFILE_ACTION_GET_USER } from "../redux/actions/ProfileAction";
import { useLoadPost, useProfileSevices } from "../sevices/ProfileServices";
export default function ProfileScreen(props: ScreenInterface){
    const dispatch = useDispatch();
    const user_id: number = props.route? props.route.id? props.route.id : 1 : 1;
    const [current, setCurrent] = React.useState<ProfileInterface>();
    const [countFriend, setCountFriend] = React.useState<number>(0);
    const [countPost, setCountPost] = React.useState<number>(0);
    const [friends, setFriends] = React.useState<Array<UserInterface>>([]);
    const [posts, setPosts] = React.useState<Array<PostInterface>>([]);
    const [isLoad, setIsLoad] = React.useState<boolean>(true);
    useProfileSevices(user_id, setCountFriend, setCountPost, setCurrent, setFriends, () => dispatch({type: PROFILE_ACTION_GET_USER}));
    useLoadPost(isLoad, setIsLoad, posts, setPosts);
    const common:Array<CommonMediaInterface> = Array.from({length: 10}, (_, i) => {
        return {
            id: i,
            image: DEV_BACKGROUND
        }
    });

    return current? <ProfileLayout 
        user={current}
        data={posts} 
        friends={friends}
        commonMedia={common}
        navigation={props.navigation}
        countFriend={countFriend}
        countPost={countPost}
        LoadPostFunction={() => setIsLoad(true)}
    /> : null
}