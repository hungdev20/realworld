import { call, takeEvery, put } from "redux-saga/effects";
import fetchProfileUser from "../../apis/user/fetchProfileUser";
import { fetchProfileUserRequest } from "./actions"
import {
    FETCH_PROFILE_USER_REQUEST,
    FETCH_PROFILE_USER_SUCCESS,
    FETCH_PROFILE_USER_ERRORS

} from "./constants";

export interface ResponseUser {
    profile?: {
        username?: string;
        bio?: string;
        image?: string;
        following: boolean;
    }
}

interface Res {
    status: number;
    data: ResponseUser;
    errors: object;
}

function* fetchProfileUserApi(payload: string) {

    const res: Res = yield call(fetchProfileUser, payload);
    return res;
}
function* fetchProfileUserFlow({ payload }: ReturnType<typeof fetchProfileUserRequest>) {

    const res: Res = yield call(fetchProfileUserApi, payload);
    if (res.status === 200) {
        yield put({ type: FETCH_PROFILE_USER_SUCCESS, data: res.data });
    } else {
        yield put({ type: FETCH_PROFILE_USER_ERRORS, error: res.errors });
    }
}

function* fetchProfileUserWatcher() {
    yield takeEvery(FETCH_PROFILE_USER_REQUEST, fetchProfileUserFlow);

}

export default fetchProfileUserWatcher;
