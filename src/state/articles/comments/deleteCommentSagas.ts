import { call, put, takeEvery } from "redux-saga/effects";
import { deleteCommentArticle } from "../../../apis/articles";
import { deleteCommentRequest } from "./actions"
import {
    DELETE_COMMENT_REQUEST,
    FETCH_COMMENTS_REQUEST
} from "./constants";
interface Res {
    status: number;
    data: object;
}

function* deleteCommentApi(param: string, id: number) {
    const res: Res = yield call(deleteCommentArticle, param, id);
    console.log(res);
    return res;
}
function* deleteCommentFlow({ payload }: ReturnType<typeof deleteCommentRequest>) {

    const res: Res = yield call(deleteCommentApi, payload.param, payload.id);
    if (res.status === 200) {
        yield put({ type: FETCH_COMMENTS_REQUEST, payload: payload.param });
    }
   
}

function* deleteCommentWatcher() {
    yield takeEvery(DELETE_COMMENT_REQUEST, deleteCommentFlow);

}

export default deleteCommentWatcher;
