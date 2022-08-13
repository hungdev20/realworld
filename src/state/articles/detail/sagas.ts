import { call, takeEvery, take, put } from "redux-saga/effects";
import { getDetailArticle } from "../../../apis/articles";
import { fetchDetailArticleRequest } from "./actions"
import {ADD_TAG_SUCCESS} from "../tags/constants"
import {
  FETCH_DETAIL_ARTICLE_REQUEST,
  FETCH_DETAIL_ARTICLE_SUCCESS,
  FETCH_DETAIL_ARTICLE_ERRORS

} from "./constants";
interface Res {
  status: number;
  data: any; 
}

function* detailArticleApi(payload: string) {
 
  const res: Res = yield call(getDetailArticle, payload);
  console.log(res);
  
  return res;
}
function* detailArticleFlow({payload}: ReturnType<typeof fetchDetailArticleRequest>) {

  const res: Res = yield call(detailArticleApi, payload);
  if (res.status === 200) {
    yield put({ type: FETCH_DETAIL_ARTICLE_SUCCESS, data: res.data });
    yield put({ type: ADD_TAG_SUCCESS, tagList: res.data.article.tagList });

  } else {
    yield put({ type: FETCH_DETAIL_ARTICLE_ERRORS, error: res });
  }
}

function* detailArticleWatcher() {
  yield takeEvery(FETCH_DETAIL_ARTICLE_REQUEST, detailArticleFlow);

}

export default detailArticleWatcher;
