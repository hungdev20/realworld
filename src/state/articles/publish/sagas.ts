import { call, takeEvery, put } from "redux-saga/effects";
import { publishArticle } from "../../../apis/articles";
import { requestAddArticle } from "./actions"
import {
    ADD_ARTICLE_REQUEST,
    ADD_ARTICLE_SUCCESS,
    ADD_ARTICLE_ERRORS

} from "./constants";
import { AddArticlePayload } from "./actions"

interface Data { 
    article: {
        slug: string
    }
}

interface Res {
    status: number;
    data: Data;
    errors: object; 
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
function* publishArticleFlow({ payload }: ReturnType<typeof requestAddArticle>) {

    const res: Res = yield call(publishArticleApi, payload);
    if (res.status === 200) {
        yield put({ type: ADD_ARTICLE_SUCCESS });
        payload.navigate("/article/" + res.data.article.slug)
    } else {
        yield put({ type: ADD_ARTICLE_ERRORS, error: res.errors });
    }
}

function* publishArticleWatcher() {
    yield takeEvery(ADD_ARTICLE_REQUEST, publishArticleFlow);

}

export default publishArticleWatcher;
