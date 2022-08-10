import { call, put, takeEvery } from "redux-saga/effects";
import { commentsArticle } from "../../../apis/articles";
import { addCommentRequest } from "./actions"
import {
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_ERRORS,
    FETCH_COMMENTS_REQUEST

} from "./constants";
interface Res {
    status: number;
    data: object;
}

function* addCommentApi(param: string, body: string) {
    const data = {
        comment: {
            body
        }
    }
    const res: Res = yield call(commentsArticle, param, data, "post");
    return res;
}
function* addCommentFlow({ payload }: ReturnType<typeof addCommentRequest>) {

    const res: Res = yield call(addCommentApi, payload.param, payload.body);
    if (res.status === 200) {
        yield put({ type: ADD_COMMENT_SUCCESS });
        yield put({ type: FETCH_COMMENTS_REQUEST, payload: payload.param });
    } else {
        yield put({ type: ADD_COMMENT_ERRORS, error: res });
    }
}

function* addCommentWatcher() {
    yield takeEvery(ADD_COMMENT_REQUEST, addCommentFlow);

}

export default addCommentWatcher;
