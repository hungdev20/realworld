import { call, put, take, fork } from "redux-saga/effects";
import getInfoUser from "../../apis/getInfoUser";
import {
    UPDATE_SETTINGS_REQUESTING,
    UPDATE_SETTINGS_SUCCESS,
    UPDATE_SETTINGS_ERRORS
} from "./constants";
import { updateSettingsRequest, payloadUser } from "./actions"
interface Res {
    status: number;
    data: object;
}

function* updateSettingsApi(payload: payloadUser) {
    const method = "put";
    const data = {
        user: payload
    };
    const res: Res = yield call(getInfoUser, method, data);
    return res;
}
function* updateSettingsFlow(payload: payloadUser, navigate: any) {
    const res: Res = yield call(updateSettingsApi, payload);
    if (res.status === 200) {
        yield put({ type: UPDATE_SETTINGS_SUCCESS, data: res.data });
        navigate("/@" + payload.username)
    } else {
        yield put({ type: UPDATE_SETTINGS_ERRORS, error: res });
    }
}

function* updateSettingsWatcher() {
    const { payload, navigate } = yield take(UPDATE_SETTINGS_REQUESTING);

    yield fork(updateSettingsFlow, payload, navigate);

}

export default updateSettingsWatcher;
