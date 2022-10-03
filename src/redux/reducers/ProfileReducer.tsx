import { ProfileInterface } from '../../common/AppInterface';
import { Action } from 'redux';
import { AUTH_ACTION_LOGGED, AUTH_ACTION_LOGOUT, PROFILE_ACTION_SET_DATA, PROFILE_ACTION_SET_USER } from '../actions/ProfileAction';
export interface ProfileReducerInterface{
    user?: ProfileInterface,
    cacheUser: Array<ProfileInterface>,
    posts: number,
    friends: number,
    isLogged: boolean | null
}

export interface ProfileReducerAction extends Action{
    user?: ProfileInterface,
    user_id?: number,
    posts?: number,
    friends?: number,
    isLogged?: boolean
}

const store:ProfileReducerInterface = {
    user: undefined,
    cacheUser: [],
    posts: 0,
    friends: 0,
    isLogged: null
}

export default function ProfileReducer(state: any = store, action: any){
    const a: ProfileReducerAction = action;
    const s: ProfileReducerInterface = state;
    switch(a.type){
        case PROFILE_ACTION_SET_USER: {
            return { ...s, user: a.user? a.user : s.user};
        }
        case PROFILE_ACTION_SET_DATA: {
            return {...s, friends: a.friends? a.friends : s.friends, posts: a.posts? a.posts : s.posts};
        }
        case AUTH_ACTION_LOGGED: {
            return {...s, isLogged: true }
        }
        case AUTH_ACTION_LOGOUT: {
            return {
                user: undefined,
                cacheUser: [],
                posts: 0,
                friends: 0,
                isLogged: false
            }
        }  
        default: return s;
    }
}