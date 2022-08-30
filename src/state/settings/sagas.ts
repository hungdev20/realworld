import { call, put, takeEvery } from "redux-saga/effects";
import { actionUser } from "../../apis/user";
import {
  FETCH_SETTINGS_REQUESTING,
  FETCH_SETTINGS_SUCCESS, 
  FETCH_SETTINGS_ERRORS,

} from "./constants";

import { User } from "../type";

interface Res {
  status: number;
  data: User;
  errors: any;
}

function* getSettingsApi() {

  const res: Res = yield call(actionUser);
  return res;
}

function* getSettingsFlow() {

  const res: Res = yield call(getSettingsApi);
  if (res.status === 200) {
    yield put({ type: FETCH_SETTINGS_SUCCESS, data: res.data });
  } else {
    yield put({ type: FETCH_SETTINGS_ERRORS, error: res.errors });
  }
}

function* getSettingsWatcher() {
  yield takeEvery(FETCH_SETTINGS_REQUESTING, getSettingsFlow);

}

export default getSettingsWatcher;
