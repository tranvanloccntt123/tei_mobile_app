import { ProfileInterface } from '../../common/AppInterface';
import { Action } from 'redux';
import { PROFILE_ACTION_SET_DATA, PROFILE_ACTION_SET_USER } from '../actions/ProfileAction';
export interface ProfileReducerInterface{
    user?: ProfileInterface,
    cacheUser: Array<ProfileInterface>,
    posts: number,
    friends: number,
    relationShip: number
}

export interface ProfileReducerAction extends Action{
    user?: ProfileInterface,
    user_id?: number,
    posts?: number,
    friends?: number,
    relationShip?: number
}

const store:ProfileReducerInterface = {
    user: undefined,
    cacheUser: [],
    posts: 0,
    friends: 0,
    relationShip: 3
}

export default function ProfileReducer(state: any = store, action: any){
    const a: ProfileReducerAction = action;
    const s: ProfileReducerInterface = state;
    switch(a.type){
        case PROFILE_ACTION_SET_USER: {
            return { ...s, user: a.user, posts: a.posts, friends: a.friends, relationShip: a.relationShip };
        }
        case PROFILE_ACTION_SET_DATA: {
            return {...s, friends: a.friends, posts: a.posts};
        }
        default: return s;
    }
}