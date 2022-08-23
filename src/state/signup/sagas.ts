
import { takeLatest, call, put } from "redux-saga/effects";
import { SIGNUP_REQUESTING, SIGNUP_SUCCESS, SIGNUP_ERROR } from "./constants";
import { LOGIN_REQUESTING } from "../login/constants"
import addUser from "../../apis/user/addUser";
import {Errors} from "./reducer";

function* signupApi(
  username: string,
  email: string,
  password: string,
  navigate: any
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
    data: object;
    errors: Errors;
  }
  const res: Res = yield call(addUser, data);

  if (res.status === 200) {
    yield put({ type: SIGNUP_SUCCESS, email });
    yield put({
      type: LOGIN_REQUESTING, payload: {
        email,
        password
      },
      navigate
    })
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
