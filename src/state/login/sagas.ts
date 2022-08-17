import { take, fork, call, put } from "redux-saga/effects";
import checkLogin from "../../apis/checkLogin";

import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_REQUEST,
} from "./constants";

import { setClient, unsetClient } from "../client/actions";

import { CLIENT_UNSET } from "../client/constants";
interface Res {
  status: number;
  username: string;
  token: string;
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

  localStorage.removeItem("token");
  localStorage.removeItem("username");
  navigate("/login");
}

function* loginFlow(email: string, password: string, navigate: any) {
  const res: Res = yield call(loginApi, email, password);
  if (res.status === 200) {

    yield put(setClient(res.token)); 

    yield put({ type: LOGIN_SUCCESS });

    localStorage.setItem("token", res.token);
    localStorage.setItem("username", res.username);
    navigate("/");
  } else {
    yield put({ type: LOGIN_ERROR, error: res });
  }
}

function* loginWatcher() {
  while (true) {
    const isLogin = Boolean(localStorage.getItem("token"));
    if (!isLogin) {
      const { payload, navigate } = yield take(LOGIN_REQUESTING);
      yield fork(loginFlow, payload.email, payload.password, navigate);
    }

    const { navigate } = yield take(LOGOUT_REQUEST);
    yield call(logout, navigate);
  }
}

export default loginWatcher;
