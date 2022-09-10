import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { PROFILE_ACTION_GET_USER, PROFILE_ACTION_SET_USER } from '../actions/ProfileAction';
import { ProfileReducerAction } from '../reducers/ProfileReducer';
import { getVisitProfile } from '@teiresource/commonconfig/Until';
import { ProfileInterface, VisitProfile } from '@teiresource/commonconfig/AppInterface';
import { COMBINE_NAME_PROFILE } from '../reducers/CombineName';
function* getUser(action: ProfileReducerAction){
    const r:VisitProfile = yield call(getVisitProfile);
    if(!r) return;
    let sendSetUserAction: ProfileReducerAction = {type: PROFILE_ACTION_SET_USER, user: r.profile, posts: r.posts, friends: r.friends};
    yield put(sendSetUserAction);
}
function* watchGetUser(){
    yield takeLatest(PROFILE_ACTION_GET_USER, getUser);
}
export default function* ProfileSagas(){
    yield all([
        fork(watchGetUser)
    ]);
}