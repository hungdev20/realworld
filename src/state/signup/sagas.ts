
import { takeLatest, call, put } from "redux-saga/effects";
import { SIGNUP_REQUESTING, SIGNUP_SUCCESS, SIGNUP_ERROR } from "./constants";
import addUser from "../../apis/user/addUser";
function* signupApi(
  username: string,
  email: string,
  password: string,
  navigate: any
) {
  const data = {
    user: { 
      email: email,
      password: password,
      username: username,
    },
  };
  const res: object | number = yield call(addUser, data);

  if (res === 200) {
    yield put({ type: SIGNUP_SUCCESS, email });
    navigate("/");
  } else {
    yield put({ type: SIGNUP_ERROR, error: res });
  }
}

function* signupFlow(action: any) {
  
  const { payload, navigate } = action;
  try {
    yield call(
      signupApi,
      payload.username,
      payload.email,
      payload.password,
      navigate
    );
  } catch (error) {}
}

function* signupWatcher() {
  yield takeLatest(SIGNUP_REQUESTING, signupFlow);
}

export default signupWatcher;
