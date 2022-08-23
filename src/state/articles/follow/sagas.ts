import { call, takeEvery, put } from "redux-saga/effects";
import { followAuthorArticle } from "../../../apis/articles";
import { followAuthorRequest } from "./actions"
import {
  FOLLOW_AUTHOR_REQUEST,
  FOLLOW_AUTHOR_SUCCESS,
  FOLLOW_AUTHOR_ERRORS

} from "./constants";

interface Res {
  status: number;
}

function* followAuthorApi(username: string | undefined, method: string) {

  const res: Res = yield call(followAuthorArticle, username, method);
  return res;
}
function* followAuthorFlow({ payload }: ReturnType<typeof followAuthorRequest>) {

  const res: Res = yield call(followAuthorApi, payload.username, payload.method);
  if (res.status === 200) {
    yield put({ type: FOLLOW_AUTHOR_SUCCESS });
  } else {
    yield put({ type: FOLLOW_AUTHOR_ERRORS, error: res });
  }
}

function* followAuthorWatcher() {
  yield takeEvery(FOLLOW_AUTHOR_REQUEST, followAuthorFlow);

}

export default followAuthorWatcher;
