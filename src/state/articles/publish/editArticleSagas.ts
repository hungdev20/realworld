import { call, put, takeEvery } from "redux-saga/effects";
import { editArticle } from "../../../apis/articles";
import { editArticleRequest } from "./actions"

import {
    EDIT_ARTICLE_REQUEST,
    EDIT_ARTICLE_SUCCESS,
    EDIT_ARTICLE_ERRORS

} from "./constants";

interface Article{
    article: {
        slug: string,
    }
}
interface Res {
    status: number;
    data: Article;
}

function* editArticleApi(payload: any) { 
    const data = {
        article: payload
    };

    const res: Res = yield call(editArticle, data);
    return res;
}
function* editArticleFlow({ payload }: ReturnType<typeof editArticleRequest>) {

    const res: Res = yield call(editArticleApi, payload.article);
    if (res.status === 200) {
        yield put({ type: EDIT_ARTICLE_SUCCESS });
        payload.navigate("/article/" + res.data.article.slug)
    } else {
        yield put({ type: EDIT_ARTICLE_ERRORS, error: res });
    }
}

function* editArticleWatcher() {
    yield takeEvery(EDIT_ARTICLE_REQUEST, editArticleFlow);

}

export default editArticleWatcher;
