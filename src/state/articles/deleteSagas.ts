import { call, put, fork, takeEvery } from "redux-saga/effects";
import { deleteArticle } from "../../apis/articles";
import {
  DELETE_ARTICLE_REQUEST,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_ERRORS
} from "./constants";
import { deleteArticleRequest } from "./actions"

interface Res {
  status: number;
  data: object;
}

function* deleteArticleApi(payload: string) {

  const res: Res = yield call(deleteArticle, payload);
  return res;
}
function* deleteArticleFlow({ payload }: ReturnType<typeof deleteArticleRequest>) {

  const res: Res = yield call(deleteArticleApi, payload.slug);
  if (res.status === 200) {
    yield put({ type: DELETE_ARTICLE_SUCCESS, data: res.data });
    payload.navigate("/")
  } else {
    yield put({ type: DELETE_ARTICLE_ERRORS, error: res });
  }
}

function* deleteArticleWatcher() {
  yield takeEvery(DELETE_ARTICLE_REQUEST, deleteArticleFlow);

}

export default deleteArticleWatcher;
