import { put, takeEvery } from "redux-saga/effects";
import * as Effects from "redux-saga/effects";
import { fetchArticles } from "../../apis/articles";
import {
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_ERRORS, 
 
} from "./constants";
import { requestFetchArticles } from "./actions"
import {Articles} from "../type";

interface Res {
  status: number;
  data: Articles;
}

const call: any = Effects.call; 
function* articlesApi(tab: string, tag: string, author: string) {
  const payload = {
    tab,
    tag,
    author
  };
  
  const res: Res = yield call(fetchArticles, payload);  
  return res;
}
function* articlesFlow({ payload }: ReturnType<typeof requestFetchArticles>) {

  const res: Res = yield call(articlesApi, payload.tab, payload.tag, payload.author);
  if (res.status === 200) {
    yield put({ type: FETCH_ARTICLES_SUCCESS, data: res.data }); 
  } else {
    yield put({ type: FETCH_ARTICLES_ERRORS, error: res });
  }
}

function* articlesWatcher() {
  yield takeEvery(FETCH_ARTICLES_REQUEST, articlesFlow);

}

export default articlesWatcher;
