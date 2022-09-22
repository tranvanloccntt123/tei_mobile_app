import { STOREAGE } from "../common/ApiRoute";
import { CheckRelationInterface, PostInterface, ProfileInterface, UserInterface, VisitProfile } from "../common/AppInterface";
import { checkRelationShip, getListFriend, getListPost, getVisitProfile, sendRelationShip } from "../common/Until";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AVATAR_DEFAULT, DEV_BACKGROUND } from "../assets/images";
import { PROFILE_ACTION_GET_USER } from "../redux/actions/ProfileAction";
import { COMBINE_NAME_PROFILE } from "../redux/reducers/CombineName";
import { esTime } from '../untils/Time';

export function stateManagement(this: any){
    const [current, setCurrent] = React.useState<ProfileInterface>();
    const [countFriend, setCountFriend] = React.useState<number>(0);
    const [countPost, setCountPost] = React.useState<number>(0);
    const [posts, setPosts] = React.useState<Array<PostInterface>>([]);
    const [isLoad, setIsLoad] = React.useState<boolean>(true);
    this.current = current;
    this.setCurrent = setCurrent;
    this.countFriend = countFriend;
    this.setCountFriend = setCountFriend;
    this.countPost = countPost;
    this.setCountPost = setCountPost;
    this.posts = posts;
    this.setPosts = setPosts;
    this.isLoad = isLoad;
    this.setIsLoad = setIsLoad;
}

export function useLoadPost(this: any) {
    const [isEndLoad, setIsEndLoad] = React.useState<boolean>(false);
    const getPost = async () => {
        if(isEndLoad) return;
        let r = await getListPost(this.posts.length? this.posts[this.posts.length - 1].id : 0, this.user_id);
        this.setIsLoad(false);
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
        this.setPosts((posts:any) => {
            return [...posts, ...mapValue]
        });
    }
    React.useEffect(() => {
        if(this.isLoad){
            getPost()
        }
    }, [this.isLoad])
}

export function useLoadProfile(this: any){
    const {profile, cFriend, cPost} = useSelector((state: any) => {
        return {
            'profile': state[`${COMBINE_NAME_PROFILE}`].user,
            'cFriend': state[`${COMBINE_NAME_PROFILE}`].friends,
            'cPost': state[`${COMBINE_NAME_PROFILE}`].posts
        }
    });
    const dispatch = useDispatch();
    React.useEffect(() => {
        if(!profile)
            dispatch({type: PROFILE_ACTION_GET_USER});  
        else {
            if(profile){
                this.setCurrent(profile);
                this.setCountFriend(cFriend);
                this.setCountPost(cPost);
            }
        }
    }, [profile]);
}

export function useCheckRelationShip(this: any){
    const getData = async () => {
        let result = await checkRelationShip(this.user_id);
        if(result == null) return;
        this.setRelationShip(result);
    }
    React.useEffect(() => {
        getData()
    }, [this.user_id])
}

export async function onHandleRelationShip (user_id: number, relationShip: CheckRelationInterface | null, setRelationShip: Function){
    let result;
    let oldPersonalRequest = relationShip?.personRequest? relationShip?.personRequest : false;
    let oldStatus = relationShip?.status? relationShip?.status : -1;
    if(relationShip?.status == 1){
        result = await sendRelationShip(user_id, -1);
        if(result) {
            setRelationShip({ status: -1, personRequest: true })
            return { status: -1, personRequest: true };
        }
    }
    else if(relationShip?.status == 0){
        if(relationShip.personRequest){
            result = await sendRelationShip(user_id, -1);
            if(result){
                setRelationShip({ status: -1, personRequest: true });
                return { status: -1, personRequest: true };
            }
        } else {
            result = await sendRelationShip(user_id, 1);
            if(result){
                setRelationShip({ status: 1, personRequest: false });
                return { status: 1, personRequest: false };
            }
        }
    }
    else if(relationShip?.status == -1){
        result = await sendRelationShip(user_id, 0);
        if(result){
            setRelationShip({ status: 0, personRequest: true });
            return { status: 0, personRequest: true };
        }
    }
    setRelationShip({status: oldStatus, personRequest: oldPersonalRequest});
    return {status: oldStatus, personRequest: oldPersonalRequest};
}

export async function handleRelationShip(this: any){
    let newRelation = await onHandleRelationShip(this.user_id, this.relationShip, this.setRelationShip);
    return newRelation;
}