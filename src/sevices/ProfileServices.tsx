import { STOREAGE } from "@teiresource/commonconfig/ApiRoute";
import { PostInterface, UserInterface, VisitProfile } from "@teiresource/commonconfig/AppInterface";
import { getListFriend, getListPost, getVisitProfile } from "@teiresource/commonconfig/Until";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AVATAR_DEFAULT, DEV_BACKGROUND } from "../assets/images";
import { PROFILE_ACTION_GET_USER } from "../redux/actions/ProfileAction";
import { COMBINE_NAME_PROFILE } from "../redux/reducers/CombineName";
import { esTime } from '../untils/Time';
export const useProfileSevices = (user_id: any, setCountFriend: Function, setCountPost: Function, setCurrent: Function, setFriends: Function, setRelationShip: Function) => {
    const {profile, cFriend, cPost, cRelationShip} = useSelector((state: any) => {
        return {
            'profile': state[`${COMBINE_NAME_PROFILE}`].user,
            'cFriend': state[`${COMBINE_NAME_PROFILE}`].friends,
            'cPost': state[`${COMBINE_NAME_PROFILE}`].posts,
            'cRelationShip': state [`${COMBINE_NAME_PROFILE}`].relationShip
        }
    });

    const getData = async () => {
        let r:VisitProfile | null = await getVisitProfile(user_id);
        if(r == null) return;
        setCountFriend(r.friends);
        setCountPost(r.posts);
        setRelationShip(r.relation_ship);
        let p = r.profile;
        if(!p.avatar) p.avatar = AVATAR_DEFAULT;
        if(!p.background) p.background = DEV_BACKGROUND;
        setCurrent(p);
    }
    React.useEffect(() => {
        if(profile){
            if(profile.id != user_id) {
                getData();
            }
            else {
                setCurrent(profile);
                setCountFriend(cFriend);
                setCountPost(cPost);
                setRelationShip(cRelationShip)
            }
        }
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

export const useLoadPost = (load: boolean, setLoad: Function, posts: Array<any>, setPost: Function) => {
    const [isEndLoad, setIsEndLoad] = React.useState<boolean>(false);
    const getPost = async () => {
        if(isEndLoad) return;
        let r = await getListPost(posts.length? posts[posts.length - 1].id : 0, 1);
        setLoad(false);
        if(!r){
            setIsEndLoad(true);
            return;
        }
        let mapValue: Array<PostInterface> = r.data.map((value: any) => {
            let createdAt = new Date(value.created_at); 
            return ({
                id: value.id,
                content: value.content,
                image: value.media? `${STOREAGE}/${value.media}` : undefined,
                user: {
                    id: value.user_id,
                    name: value.name,
                    avatar: AVATAR_DEFAULT,
                    background: DEV_BACKGROUND
                },
                created_at: `${esTime(createdAt.getHours())}:${esTime(createdAt.getMinutes())} ${esTime(createdAt.getDate())}/${esTime(createdAt.getMonth())}/${createdAt.getFullYear()}`
            });
        });
        setPost((posts:any) => {
            return [...posts, ...mapValue]
        });
    }
    React.useEffect(() => {
        if(load){
            getPost()
        }
    }, [load])
}

export const useLoadProfile = () => {
    const profile = useSelector((state: any) => state[`${COMBINE_NAME_PROFILE}`].user);
    const dispatch = useDispatch();
    React.useEffect(() => {
        if(!profile)
            dispatch({type: PROFILE_ACTION_GET_USER});  
    }, [profile]);
}