import { takeEvery, put } from "redux-saga/effects";
import { removeTagRequest } from "./actions"
import {
    REMOVE_TAG_REQUEST,
    REMOVE_TAG_SUCCESS

} from "./constants";

function* removeTagFlow({ payload }: ReturnType<typeof removeTagRequest>) {

    payload.tagList.splice(payload.index, 1)

    yield put({ type: REMOVE_TAG_SUCCESS, tagList: payload.tagList });

}

function* removeTagWatcher() {
    yield takeEvery(REMOVE_TAG_REQUEST, removeTagFlow);

}

export default removeTagWatcher;
