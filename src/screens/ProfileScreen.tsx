import { ProfileInterface, PostInterface, UserInterface } from "@teiresource/commonconfig/AppInterface";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AVATAR_DEFAULT, DEV_BACKGROUND } from "../assets/images";
import { CommonMediaInterface } from "../common/PostInterface";
import { ScreenInterface } from "../common/ScreenInterface";
import ProfileLayout from "../components/profile/layouts/ProfileBasicLayout";
import { PROFILE_ACTION_GET_USER } from "../redux/actions/ProfileAction";
import { useLoadPost, useProfileSevices } from "../sevices/ProfileServices";
export default function ProfileSccreen(props: ScreenInterface){
    const dispatch = useDispatch();
    const user_id: number = props.route? props.route.id : 1;
    const [current, setCurrent] = React.useState<ProfileInterface>();
    const [countFriend, setCountFriend] = React.useState<number>(0);
    const [countPost, setCountPost] = React.useState<number>(0);
    const [friends, setFriends] = React.useState<Array<UserInterface>>([]);
    const [posts, setPosts] = React.useState<Array<PostInterface>>([]);
    const [isLoad, setIsLoad] = React.useState<boolean>(true);
    useProfileSevices(user_id, setCountFriend, setCountPost, setCurrent, setFriends, () => dispatch({type: PROFILE_ACTION_GET_USER}));
    useLoadPost(isLoad, setIsLoad, setPosts);
    const common:Array<CommonMediaInterface> = Array.from({length: 10}, (_, i) => {
        return {
            id: i,
            image: DEV_BACKGROUND
        }
    });
    // const data:Array<PostInterface> = Array.from({length: 15}, (_, i) => {
    //     return {
    //         id: i,
    //         content: `Lorem ipsum dolor sit amet, omittam patrioque cu qui, eu mea similique definitionem. Et nam posse ceteros. Legere lucilius voluptatibus ut nec, est augue soleat regione te. Ex affert doming duo, postea ponderum gubergren mei at, altera labores at ius. Quo et tacimates mediocrem suavitate.`,
    //         created_at: `20:15 25-8-2022`,
    //         user: {
    //             id: 1,
    //             name: 'Jenny',
    //             avatar: AVATAR_DEFAULT
    //         },
    //         image: DEV_BACKGROUND,
    //     }
    // });

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