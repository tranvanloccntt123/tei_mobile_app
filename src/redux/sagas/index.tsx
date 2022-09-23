import { all, fork } from "redux-saga/effects";
import LoginSagas from "./LoginSagas";
import ProfileSagas from "./ProfileSagas";
export default function* AppSaga() {
    yield all([
        fork(LoginSagas),
        fork(ProfileSagas)
    ]);
}