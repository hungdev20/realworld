
import { takeLatest, call, put } from "redux-saga/effects";
import { SIGNUP_REQUESTING, SIGNUP_SUCCESS, SIGNUP_ERROR } from "./constants";
import { actionUser } from "../../apis/user";
import { Errors } from "./reducer";
import { User } from "../type";
import { NavigateFunction } from "react-router-dom";
import { ACTION_USER_SUCCESS } from "../user/constants";

function* signupApi(
  username: string,
  email: string,
  password: string,
  navigate: NavigateFunction
) {
  const data = {
    user: {
      email,
      password,
      username,
    },
  };

  interface Res {
    status: number;
    data: User;
    errors: Errors;
  }
  const res: Res = yield call(actionUser, "post", data, false);  

  if (res.status === 200) {
    yield put({ type: SIGNUP_SUCCESS });
    yield put({ type: ACTION_USER_SUCCESS, data: res.data });
    localStorage.setItem("token", res.data?.user?.token ? res.data?.user?.token : "");
    navigate("/");
  } else {
    yield put({ type: SIGNUP_ERROR, error: res.errors });
  }
}

function* signupFlow(action: any) {

  const { payload, navigate } = action;
  yield call(
    signupApi,
    payload.username,
    payload.email,
    payload.password,
    navigate
  );
}

function* signupWatcher() {
  yield takeLatest(SIGNUP_REQUESTING, signupFlow);
}

export default signupWatcher;
