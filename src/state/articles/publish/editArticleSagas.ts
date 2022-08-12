import { call, fork, take, put } from "redux-saga/effects";
import { editArticle } from "../../../apis/articles";
import {
    EDIT_ARTICLE_REQUEST,
    EDIT_ARTICLE_SUCCESS, 
    EDIT_ARTICLE_ERRORS

} from "./constants";
interface Res {
    status: number;
    data: any;
}

function* editArticleApi(payload: any) {
    const data = {
        article: payload
    };
    
    const res: Res = yield call(editArticle, data);    
    return res;
}
function* editArticleFlow(payload: any, navigate: any) {

    const res: Res = yield call(editArticleApi, payload);
    if (res.status === 200) {
        yield put({ type: EDIT_ARTICLE_SUCCESS });
        navigate("/article/" + res.data.article.slug)
    } else {
        yield put({ type: EDIT_ARTICLE_ERRORS, error: res });
    }
}

function* editArticleWatcher() {
    const { payload, navigate } = yield take(EDIT_ARTICLE_REQUEST);
    yield fork(editArticleFlow, payload, navigate);

}

export default editArticleWatcher;
