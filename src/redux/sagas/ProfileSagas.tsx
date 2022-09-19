import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { PROFILE_ACTION_GET_USER, PROFILE_ACTION_SET_USER } from '../actions/ProfileAction';
import { ProfileReducerAction } from '../reducers/ProfileReducer';
import { getVisitProfile } from '../../common/Until';
import { VisitProfile } from '../../common/AppInterface';
function* getUser(action: ProfileReducerAction){
    const r:VisitProfile = yield call(getVisitProfile);
    if(!r) return;
    let sendSetUserAction: ProfileReducerAction = {type: PROFILE_ACTION_SET_USER, user: r.profile, posts: r.posts, friends: r.friends, relationShip: r.relation_ship};
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