import { call, put, takeEvery } from "redux-saga/effects";
import { actionUser } from "../../apis/user";
import { User } from "../type";
import { ACTION_USER_SUCCESS } from "../user/constants";

import {
    UPDATE_SETTINGS_REQUESTING,
    UPDATE_SETTINGS_SUCCESS,
    UPDATE_SETTINGS_ERRORS
} from "./constants";

import { updateSettingsRequest } from "./actions"
interface Res {
    status: number;
    data: User;
}

function* updateSettingsApi(email?: string, username?: string, bio?: string, image?: string, password?: string) {
    const method = "put";
    const data = {
        user: {
            email,
            username,
            bio,
            image,
            password
        } 
    };
    const res: Res = yield call(actionUser, method, data);
    return res;
}

function* updateSettingsFlow({ payload }: ReturnType<typeof updateSettingsRequest>) {
    const res: Res = yield call(updateSettingsApi, payload?.email, payload?.username, payload?.bio, payload?.image, payload?.password);
    if (res.status === 200) {
        yield put({ type: UPDATE_SETTINGS_SUCCESS, data: res.data });
        yield put({ type: ACTION_USER_SUCCESS, data: res.data });
        // yield put({ type: SET_STATE_USER_DEFAULT });
        if (payload?.username !== payload?.prevUsername) {
            localStorage.removeItem("token");
        }
        payload.navigate("/@" + res.data?.user?.username)
    } else {
        yield put({ type: UPDATE_SETTINGS_ERRORS, error: res });
    }
}

function* updateSettingsWatcher() {
    yield takeEvery(UPDATE_SETTINGS_REQUESTING, updateSettingsFlow);
}

export default updateSettingsWatcher;
