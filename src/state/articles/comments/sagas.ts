import { call, takeEvery, put } from "redux-saga/effects";
import { commentsArticle } from "../../../apis/articles";
import { fetchCommentsRequest } from "./actions"

import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_ERRORS

} from "./constants";

export interface ResponseComments {
  comments?: [
    {
      author?: {
        username?: string;
        bio?: string;
        image?: string;
        following?: boolean;
      },
      id: number;
      body: string;
      createdAt: string;
      updatedAt: string;
    }
  ]
}


interface Res {
  status: number;
  data: ResponseComments;
  errors: object;
}

function* fetchCommentsApi(payload: string) {

  const res: Res = yield call(commentsArticle, payload);
  return res;
}
function* fetchCommentsFlow({ payload }: ReturnType<typeof fetchCommentsRequest>) {

  const res: Res = yield call(fetchCommentsApi, payload);
  if (res.status === 200) {
    yield put({ type: FETCH_COMMENTS_SUCCESS, data: res.data });
  } else {
    yield put({ type: FETCH_COMMENTS_ERRORS, error: res.errors });
  }
}

function* fetchCommentsWatcher() {
  yield takeEvery(FETCH_COMMENTS_REQUEST, fetchCommentsFlow);
}

export default fetchCommentsWatcher;
