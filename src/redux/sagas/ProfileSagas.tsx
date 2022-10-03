import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { AUTH_ACTION_CHECK_LOGIN, AUTH_ACTION_LOGGED, AUTH_ACTION_LOGOUT, PROFILE_ACTION_GET_USER, PROFILE_ACTION_SET_DATA, PROFILE_ACTION_SET_USER } from '../actions/ProfileAction';
import { ProfileReducerAction } from '../reducers/ProfileReducer';
import { getVisitProfile } from '../../common/Until';
import { VisitProfile } from '../../common/AppInterface';
import { getToken } from '../../untils/AuthUntils';
import { ApiRequest } from '../../common/ApiRequest';
import { UserFactory } from '../../Factory/UserFactory';
function* getUser(action: ProfileReducerAction){
    const r:VisitProfile = yield call(getVisitProfile);
    if(!r) return;
    let sendSetUserAction: ProfileReducerAction = {type: PROFILE_ACTION_SET_USER, user: new UserFactory("ProfileInterface", r.profile).build()};
    yield put(sendSetUserAction);
    sendSetUserAction = {type: PROFILE_ACTION_SET_DATA, posts: r.posts, friends: r.friends}
}
function* watchGetUser(){
    yield takeLatest(PROFILE_ACTION_GET_USER, getUser);
}

function* checkLogin(action: ProfileReducerAction){
    let r = yield call(getToken);
    if(r){
        yield put({type: AUTH_ACTION_LOGGED});
        ApiRequest.token = r;
    }
    else yield put({type: AUTH_ACTION_LOGOUT});
}

function* watchCheckLogin(){
    yield takeLatest(AUTH_ACTION_CHECK_LOGIN, checkLogin);
}

export default function* ProfileSagas(){
    yield all([
        fork(watchCheckLogin),
        fork(watchGetUser)
    ]);
}
