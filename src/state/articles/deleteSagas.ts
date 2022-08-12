import { takeLatest, call, put, fork, take, takeEvery } from "redux-saga/effects";
import { deleteArticle } from "../../apis/articles";
import {
    DELETE_ARTICLE_REQUEST,
    DELETE_ARTICLE_SUCCESS,
    DELETE_ARTICLE_ERRORS
} from "./constants";
interface Res {
    status: number;
    data: object;
}

function* deleteArticleApi(payload: string) {
   
    const res: Res = yield call(deleteArticle, payload);    
    return res;
}
function* deleteArticleFlow(payload: string, navigate: any) {

    const res: Res = yield call(deleteArticleApi, payload);
      if (res.status === 200) {
        yield put({ type: DELETE_ARTICLE_SUCCESS, data: res.data });
        navigate("/")
      } else {
        yield put({ type: DELETE_ARTICLE_ERRORS, error: res });
      }
}

function* deleteArticleWatcher() {
    const { payload, navigate } = yield take(DELETE_ARTICLE_REQUEST);
    
    yield fork(deleteArticleFlow, payload, navigate);

}

export default deleteArticleWatcher;
