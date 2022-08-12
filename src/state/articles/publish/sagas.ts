import { call, fork, take, put } from "redux-saga/effects";
import { publishArticle } from "../../../apis/articles";
import {
    ADD_ARTICLE_REQUEST,
    ADD_ARTICLE_SUCCESS,
    ADD_ARTICLE_ERRORS

} from "./constants";
import { AddArticlePayload } from "./actions"
interface Res {
    status: number;
    data: any;
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
    return res;
}
function* publishArticleFlow(payload: AddArticlePayload, navigate: any) {

    const res: Res = yield call(publishArticleApi, payload);
    if (res.status === 200) {
        yield put({ type: ADD_ARTICLE_SUCCESS, data: res.data });
        navigate("/article/" + res.data.article.slug)
    } else {
        yield put({ type: ADD_ARTICLE_ERRORS, error: res });
    }
}

function* publishArticleWatcher() {
    const { payload, navigate } = yield take(ADD_ARTICLE_REQUEST);
    yield fork(publishArticleFlow, payload, navigate);

}

export default publishArticleWatcher;
