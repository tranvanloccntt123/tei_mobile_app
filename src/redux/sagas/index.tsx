import { all, fork } from "redux-saga/effects";
import ProfileSagas from "./ProfileSagas";
export default function* AppSaga() {
    yield all([
        fork(ProfileSagas)
    ]);
}