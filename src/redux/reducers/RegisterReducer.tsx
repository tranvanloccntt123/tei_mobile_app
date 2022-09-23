import { Action } from 'redux';
import { RESPONSE_FAIL, RESPONSE_SUCCESS } from '../../untils/AuthUntils';
import { REGISTER_ACTION_SET_ALTER, REGISTER_ACTION_SET_ERROR, REGISTER_ACTION_SET_INPUT, REGISTER_ACTION_SET_STATUS } from '../actions/RegisterActions';
import { AlterLoginReducerInterface } from './LoginReducer';
export interface InputRegisterReducerInterface{
    name: string,
    username: string, 
    password: string
}

export interface ErrorRegisterReducerInterface{
    name?: string,
    username?: string,
    password?: string
}

export interface RegisterReducerInterface{
    input: InputRegisterReducerInterface,
    error: ErrorRegisterReducerInterface,
    status: string,
    alter: AlterLoginReducerInterface
}

export interface RegisterReducerAction extends Action{
    input?: InputRegisterReducerInterface,
    error?: ErrorRegisterReducerInterface
    status?: string,
    alter?: string
}

const store = {
    input: {
        name: '',
        username: '',
        password: ''
    },
    error: {
        name: '',
        username: '',
        password: ''
    },
    status: RESPONSE_FAIL,
    alter: {
        _id: 0,
        message: ""
    }
}

export default function RegisterReducer(state: any = store, action: RegisterReducerAction){
    const a: RegisterReducerAction = action;
    const s: RegisterReducerInterface = state;
    switch(a.type){
        case REGISTER_ACTION_SET_ERROR: {
            return {...s, error: {
                name: a.error?.name,
                username: a.error?.username,
                password: a.error?.password
            }}
        }
        case REGISTER_ACTION_SET_INPUT: {
            return {...state, input: {
                name: a.input?.name,
                username: a.input?.username,
                password: a.input?.password
            }};
        }
        case REGISTER_ACTION_SET_STATUS: {
            return {...s, status: a.status? a.status : RESPONSE_SUCCESS}
        }
        case REGISTER_ACTION_SET_ALTER: {
            return {...s, alter: {
                _id: s.alter._id + 1,
                message: a.alter? a.alter : ""
            }};
        }
        default: return s;
    }
}