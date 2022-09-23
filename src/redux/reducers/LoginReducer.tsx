import { Action } from "redux";
import { RESPONSE_FAIL, RESPONSE_SUCCESS } from "../../untils/AuthUntils";
import { LOGIN_ACTION_SET_ALTER, LOGIN_ACTION_SET_ERROR, LOGIN_ACTION_SET_STATUS } from "../actions/LoginActions";

export interface AlterLoginReducerInterface{
    _id: number,
    message: string
};

export interface ErrorLoginReducerInterface{
    _id: number
    username?: string,
    password?: string
}

export interface InputLoginReducerInterface{
    username: string,
    password: string
}

export interface LoginReducerInterface{
    alter: AlterLoginReducerInterface,
    error: ErrorLoginReducerInterface,
    status: string
};

export interface LoginReducerAction extends Action{
    alter?: string,
    error?: ErrorLoginReducerInterface,
    input?: InputLoginReducerInterface,
    status?: string
}

const store: LoginReducerInterface = {
    status: RESPONSE_FAIL,
    alter: {
        _id: 0,
        message: ""
    },
    error: {
        _id: 0,
        username: '',
        password: ''
    }
}

export default function LoginReducer(state:any = store, action: any){
    const a: LoginReducerAction = action;
    const s: LoginReducerInterface = state;
    switch(a.type){
        case LOGIN_ACTION_SET_ALTER: {
            return {...s, alter: {
                _id: s.alter._id + 1,
                message: a.alter? a.alter : ""
            }};
        }
        case LOGIN_ACTION_SET_ERROR: {
            return {
                ...s, 
                error: {
                    _id: s.error._id + 1,
                    username: a.error?.username,
                    password: a.error?.password
                }
            };
        }
        case LOGIN_ACTION_SET_STATUS: {
            return {
                ...s, 
                status: a.status? a.status : RESPONSE_SUCCESS
            }
        }
        default: return s;
    }
}