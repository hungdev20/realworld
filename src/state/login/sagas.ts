import { takeEvery, take, call, put } from "redux-saga/effects";
import checkLogin from "../../apis/checkLogin";
import { User } from "../type";
import { ACTION_USER_SUCCESS } from "../user/constants";
import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_REQUEST,
} from "./constants";
import { SET_STATE_USER_DEFAULT } from "../../state/user/constants";
import { setClient, unsetClient } from "../client/actions";
import { loginRequest } from "./actions";
import { Errors } from "./reducer";

interface Res {
  status: number;
  data: User;
  errors: Errors;
}
function* loginApi(email: string, password: string) {
  const data = {
    user: {
      email: email,
      password: password,
    },
  };

  const res: Res = yield call(checkLogin, data);
  return res;
}

function* logout(navigate: any) {
  yield put(unsetClient());
  yield put({ type: SET_STATE_USER_DEFAULT }); 

  localStorage.removeItem("token");
  navigate("/login");
}

function* loginFlow({ payload }: ReturnType<typeof loginRequest>) {
  const res: Res = yield call(loginApi, payload.email, payload.password);
  if (res.status === 200) {

    yield put(setClient(res.data?.user?.token));

    yield put({ type: LOGIN_SUCCESS });
    yield put({ type: ACTION_USER_SUCCESS, data: res.data });
    localStorage.setItem("token", res.data?.user?.token ? res.data?.user?.token : "");
    payload.navigate("/");
  } else {
    yield put({ type: LOGIN_ERROR, error: res.errors });
  }
}

function* loginWatcher() {
  while (true) {
    const isLogin = Boolean(localStorage.getItem("token"));
    if (!isLogin) {
      yield takeEvery(LOGIN_REQUESTING, loginFlow);
      // yield fork(loginFlow, payload.email, payload.password, navigate);
    }

    const { navigate } = yield take(LOGOUT_REQUEST);
    yield call(logout, navigate);
  }
}

export default loginWatcher;
