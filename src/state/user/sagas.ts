import { call, put, takeEvery } from "redux-saga/effects";
import actionUser from "../../apis/user/actionUser";
import {
    ACTION_USER_REQUESTING,
    ACTION_USER_SUCCESS,
    ACTION_USER_ERROR

} from "./constants";

import { User } from "../type";
import { actionUserRequest } from "./actions";
interface Res {
    status: number;
    data: User;
    errors: any;
}

function* actionUserApi() {

    const res: Res = yield call(actionUser);
    return res;
}

function* actionUserFlow({ payload }: ReturnType<typeof actionUserRequest>) {

    const res: Res = yield call(actionUserApi);
    if (res.status === 200) {
        yield put({ type: ACTION_USER_SUCCESS, data: res.data });
    } else {
        yield put({ type: ACTION_USER_ERROR, error: res.errors });
    }
}

function* actionUserWatcher() {
    yield takeEvery(ACTION_USER_REQUESTING, actionUserFlow);

}

export default actionUserWatcher;
