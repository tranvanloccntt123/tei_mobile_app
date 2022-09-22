import { STOREAGE } from "../common/ApiRoute";
import { CheckRelationInterface, PostInterface, ProfileInterface, UserInterface, VisitProfile } from "../common/AppInterface";
import { checkRelationShip, deletePost, getListFriend, getListPost, getVisitProfile, sendRelationShip } from "../common/Until";
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
    const [pickPost, setPickPost] = React.useState<PostInterface | null>(null);
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
    this.pickPost = pickPost;
    this.setPickPost = setPickPost;

    const {profile, cFriend, cPost} = useSelector((state: any) => {
        return {
            'profile': state[`${COMBINE_NAME_PROFILE}`].user,
            'cFriend': state[`${COMBINE_NAME_PROFILE}`].friends,
            'cPost': state[`${COMBINE_NAME_PROFILE}`].posts
        }
    });
    React.useEffect(() => {
        if(profile){
            this.setCurrent(profile);
            this.setCountFriend(cFriend);
            this.setCountPost(cPost);
        }
    }, [profile]);
}

export function useLoadPost(this: any) {
    const getPost = async () => {
        let r = await getListPost(this.posts.length? this.posts[this.posts.length - 1].id : 0, this.user_id);
        this.setIsLoad(false);
        if(!r){
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
                uuid: value.UUID,
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

export function useLoadProfile(){
    const profile = useSelector((state: any) => state[`${COMBINE_NAME_PROFILE}`].user);
    const dispatch = useDispatch();
    React.useEffect(() => {
        if(!profile)
            dispatch({type: PROFILE_ACTION_GET_USER});  
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

export async function sendDeletePost(this: any){
    if(!this.pickPost) return;
    let result = await deletePost(this.pickPost.uuid);
    if(!result) return;
    let index = this.posts.findIndex((element: PostInterface) => element.uuid == this.pickPost.uuid);
    if(this.posts){
        let newPost = [...this.posts];
        newPost.splice(index, 1);
        this.setPosts(newPost);
    }
}