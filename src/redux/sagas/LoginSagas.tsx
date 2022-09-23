import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { ResponseInterface } from '../../common/AppInterface';
import { Authentication, Registration, RESPONSE_FAIL, RESPONSE_SUCCESS } from '../../untils/AuthUntils';
import { LOGIN_ACTION_SEND_REQUEST, LOGIN_ACTION_SET_ALTER, LOGIN_ACTION_SET_ERROR, LOGIN_ACTION_SET_STATUS } from '../actions/LoginActions';
import { REGISTER_ACTION_SEND_REQUEST, REGISTER_ACTION_SET_ALTER, REGISTER_ACTION_SET_ERROR, REGISTER_ACTION_SET_INPUT, REGISTER_ACTION_SET_STATUS } from '../actions/RegisterActions';
import { ErrorRegisterReducerInterface, RegisterReducerAction } from '../reducers/RegisterReducer';
import { ErrorLoginReducerInterface, LoginReducerAction } from '../reducers/LoginReducer';

function* loginRequest(action: LoginReducerAction) {
    if (!action.input) return;
    let result: ResponseInterface = yield call(Authentication, action.input.username, action.input.password);
    if (result) {
        switch (result.status.toLowerCase()) {
            case RESPONSE_SUCCESS: {
                yield put({type: LOGIN_ACTION_SET_STATUS});
                return;
            }
            case RESPONSE_FAIL: {
                yield put({type: LOGIN_ACTION_SET_STATUS, status: RESPONSE_FAIL});
                yield put({type: LOGIN_ACTION_SET_ALTER, alter: "Fail, please check username or password!"});
                let error: ErrorLoginReducerInterface = {_id: 0}
                if(result.message.password) error.password = result.message.password[0];
                if(result.message.username) error.username = result.message.username[0];
                yield put({type: LOGIN_ACTION_SET_ERROR, error: error});
                return
            }
        }
    }
    else{
        yield put({type: LOGIN_ACTION_SET_STATUS, status: RESPONSE_FAIL});
        yield put({type: LOGIN_ACTION_SET_ALTER, alter: "Fail, server down!"});
    }
}

function* watchLoginRequest() {
    yield takeLatest(LOGIN_ACTION_SEND_REQUEST, loginRequest)
}

function* registerRequest(action: RegisterReducerAction){
    if(!action.input) return;
    let result: ResponseInterface = yield call(Registration, action.input.name, action.input.username, action.input.password);
    console.log(result.message);
    if(result){
        switch(result.status.toLowerCase()){
            case RESPONSE_SUCCESS: {
                yield put({type: REGISTER_ACTION_SET_STATUS});
                yield put({type: REGISTER_ACTION_SET_INPUT, input: action.input});
                return;
            }
            case RESPONSE_FAIL: {
                yield put({type: REGISTER_ACTION_SET_STATUS, status: RESPONSE_FAIL});
                yield put({type: REGISTER_ACTION_SET_ALTER, alter: "Fail, cannot registration!"});
                let error: ErrorRegisterReducerInterface = {};
                if(result.message.password) error.password = result.message.password[0];
                if(result.message.username) error.username = result.message.username[0];
                if(result.message.name) error.name = result.message.name[0];
                yield put({type: REGISTER_ACTION_SET_ERROR, error: error});
                return;
            }
        }
    }else{
        yield put({type: REGISTER_ACTION_SET_STATUS, status: RESPONSE_FAIL});
    }
}

function* watchRegisterRequest(){
    yield takeLatest(REGISTER_ACTION_SEND_REQUEST, registerRequest);
}

export default function* LoginSagas() {
    yield all([
        fork(watchLoginRequest),
        fork(watchRegisterRequest)
    ]);
}