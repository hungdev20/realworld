import { call, put,takeEvery } from "redux-saga/effects";
import getInfoUser from "../../apis/getInfoUser";
import {
  FETCH_SETTINGS_REQUESTING,
  FETCH_SETTINGS_SUCCESS,
  FETCH_SETTINGS_ERRORS,

} from "./constants";

interface Res {
  status: number;
  data: object;
}

function* getSettingsApi() {

  const res: Res = yield call(getInfoUser);    
  return res;
}
function* getSettingsFlow() {
  
  const res: Res = yield call(getSettingsApi);
  if (res.status === 200) {
    yield put({ type: FETCH_SETTINGS_SUCCESS, data: res.data });
  } else {
    yield put({ type:   FETCH_SETTINGS_ERRORS, error: res });
  }
}

function* getSettingsWatcher() {
  yield takeEvery(FETCH_SETTINGS_REQUESTING, getSettingsFlow);

}

export default getSettingsWatcher;
