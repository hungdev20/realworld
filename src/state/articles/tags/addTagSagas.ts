import { takeEvery, put } from "redux-saga/effects";
import { addTagRequest } from "./actions"
import {
  ADD_TAG_REQUEST,
  ADD_TAG_SUCCESS

} from "./constants";

function* addTagFlow({ payload }: ReturnType<typeof addTagRequest>) {
  if (payload.tag.length > 0) {
    payload.tagList.push(payload.tag);
  }
  yield put({ type: ADD_TAG_SUCCESS, tagList: payload.tagList });

}

function* addTagWatcher() {
  yield takeEvery(ADD_TAG_REQUEST, addTagFlow);

}

export default addTagWatcher;
