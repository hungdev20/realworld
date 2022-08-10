import { call, takeEvery, take, put } from "redux-saga/effects";
import { followAuthorArticle } from "../../../apis/articles";
import { followAuthorRequest } from "./actions"
import {
    FOLLOW_AUTHOR_REQUEST,
    FOLLOW_AUTHOR_SUCCESS,
    FOLLOW_AUTHOR_ERRORS

} from "./constants";
import {
    FETCH_DETAIL_ARTICLE_REQUEST
} from "../detail/constants";
interface Res {
  status: number;
  data: object;
}

function* followAuthorApi(username: string, method: string) {

  const res: Res = yield call(followAuthorArticle, username, method);  
  return res;
}
function* followAuthorFlow({payload}: ReturnType<typeof followAuthorRequest>) {

  const res: Res = yield call(followAuthorApi, payload.username, payload.method);
  if (res.status === 200) {
    yield put({ type: FOLLOW_AUTHOR_SUCCESS});
    yield put({ type: FETCH_DETAIL_ARTICLE_REQUEST, payload: payload.param });
  } else {
    yield put({ type: FOLLOW_AUTHOR_ERRORS, error: res });
  }
}

function* followAuthorWatcher() {
  yield takeEvery(FOLLOW_AUTHOR_REQUEST, followAuthorFlow);

}

export default followAuthorWatcher;