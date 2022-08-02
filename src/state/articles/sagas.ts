import { takeLatest, call, put, fork, take } from "redux-saga/effects";
import fetchArticles from "../../apis/fetchArticles";
import {
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_ERRORS,
} from "./constants";

interface Res {
  status: number;
  data: object;
}

function* articlesApi(tab: string, tag: string) {
  const payload = {
    tab,
    tag,
  };

  const res: Res = yield call(fetchArticles, payload);
  console.log(res);
  
  return res;
}
function* articlesFlow(tab: string, tag: string) {
  const res: Res = yield call(articlesApi, tab, tag);
  if (res.status === 200) {
    yield put({ type: FETCH_ARTICLES_SUCCESS, data: res.data });
  } else {
    yield put({ type: FETCH_ARTICLES_ERRORS, error: res });
  }
}

function* articlesWatcher() {
  const { payload } = yield take(FETCH_ARTICLES_REQUEST);
  yield fork(articlesFlow, payload.tab, payload.tag);
}

export default articlesWatcher;
