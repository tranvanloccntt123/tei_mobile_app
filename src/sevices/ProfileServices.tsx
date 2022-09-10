import { STOREAGE } from "@teiresource/commonconfig/ApiRoute";
import { UserInterface, VisitProfile } from "@teiresource/commonconfig/AppInterface";
import { getListFriend, getListPost, getVisitProfile } from "@teiresource/commonconfig/Until";
import React from "react";
import { useSelector } from "react-redux";
import { AVATAR_DEFAULT, DEV_BACKGROUND } from "../assets/images";
import { COMBINE_NAME_PROFILE } from "../redux/reducers/CombineName";
export const useProfileSevices = (user_id: any, setCountFriend: Function, setCountPost: Function, setCurrent: Function, setFriends: Function, onProfileNull: Function) => {
    const {profile, cFriend, cPost} = useSelector((state: any) => {
        return {
            'profile': state[`${COMBINE_NAME_PROFILE}`].user,
            'cFriend': state[`${COMBINE_NAME_PROFILE}`].friends,
            'cPost': state[`${COMBINE_NAME_PROFILE}`].posts
        }
    });

    const getData = async () => {
        let r:VisitProfile | null = await getVisitProfile(user_id);
        if(r == null) return;
        setCountFriend(r.friends);
        setCountPost(r.posts);
        let p = r.profile;
        if(!p.avatar) p.avatar = AVATAR_DEFAULT;
        if(!p.background) p.background = DEV_BACKGROUND;
        setCurrent(p);
    }
    React.useEffect(() => {
        if(profile){
            if(profile.id != user_id) getData();
            else {
                setCurrent(profile);
                setCountFriend(cFriend);
                setCountPost(cPost);
            }
        }
        else  onProfileNull();
    },[profile]);
    const getFriend = async () => {
        let r = await getListFriend();
        if(!r) return;
        setFriends(r.data.map((value: UserInterface) => {
            let r: UserInterface = {
                id: value.id,
                name: value.name,
                avatar: value.avatar? {uri: `${STOREAGE}/${value.avatar}`} : AVATAR_DEFAULT,
                background: value.background? {uri: `${STOREAGE}/${value.background}`} : DEV_BACKGROUND
            }
            return r;
        }));
    }
    React.useEffect(() => {
        getFriend()
    }, []);
}

export const useLoadPost = (load: boolean, setLoad: Function, setPost: Function) => {
    let postLeftID: number = 0;
    let isEndLoad: boolean = false;
    const getPost = async () => {
        if(isEndLoad) return;
        let r = await getListPost(postLeftID, 1);
        setLoad(false);
        if(!r){
            isEndLoad = true;
            return;
        }
        setPost((posts:any) => {
            return [...posts, ...r!!.data]
        })
    }
    React.useEffect(() => {
        if(load){
            getPost()
        }
    }, [load])
}