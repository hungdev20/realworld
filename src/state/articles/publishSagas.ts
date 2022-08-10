import { takeLatest, call, put, fork, take, takeEvery } from "redux-saga/effects";
import { publishArticle } from "../../apis/articles";
import {
    ADD_ARTICLE_REQUEST

} from "./constants";
import { AddArticlePayload } from "./actions"
interface Res {
    status: number;
    data: object;
}

function* publishArticleApi(payload: AddArticlePayload) {
    const data = {
        article: {
            title: payload.title,
            description: payload.description,
            body: payload.body,
            tagList: payload.tagList
        },
    };
    const res: Res = yield call(publishArticle, data);
    // return res;
}
function* publishArticleFlow(payload: AddArticlePayload) {

    const res: Res = yield call(publishArticleApi, payload);
    //   if (res.status === 200) {
    //     yield put({ type: FETCH_ARTICLES_SUCCESS, data: res.data });
    //   } else {
    //     yield put({ type: FETCH_ARTICLES_ERRORS, error: res });
    //   }
}

function* publishArticleWatcher() {
    const { payload } = yield take(ADD_ARTICLE_REQUEST);
    yield fork(publishArticleFlow, payload);

}

export default publishArticleWatcher;
