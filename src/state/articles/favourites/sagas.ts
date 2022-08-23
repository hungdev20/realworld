import { call, takeEvery, put } from "redux-saga/effects";
import { favoriteArticle } from "../../../apis/articles";
import {
  FAVORITE_ARTICLE_SUCCESS,
  FAVORITE_ARTICLE_ERRORS,
  REMOVE_FAVORITE_ARTICLE_SUCCESS,
  REMOVE_FAVORITE_ARTICLE_ERRORS,
  FAVORITE_ARTICLE_REQUEST,
} from "./constants";
import { FETCH_DETAIL_ARTICLE_REQUEST } from "../detail/constants"
import { favoriteArticleRequest } from "./actions"
import {Article} from "../../interface";

interface Res {
  status: number;
  data: Article;
}

function* favoriteArticlesApi(favorited: boolean, slug: string|undefined) {
  const payload = {
    favorited,
    slug,
  };

  const res: Res = yield call(favoriteArticle, payload);
  return res;
}
function* favoriteFlow({ payload }: ReturnType<typeof favoriteArticleRequest>) {

  const res: Res = yield call(favoriteArticlesApi, payload.favorited, payload.slug);
  const favorited = res?.data?.article?.favorited;


  if (res.status === 200) {
    if (favorited) {
      yield put({ type: FAVORITE_ARTICLE_SUCCESS });
      if (payload.detail) {
        yield put({ type: FETCH_DETAIL_ARTICLE_REQUEST, payload: payload.slug });
      }
    } else {
      yield put({ type: REMOVE_FAVORITE_ARTICLE_SUCCESS });
      if (payload.detail) {
        yield put({ type: FETCH_DETAIL_ARTICLE_REQUEST, payload: payload.slug });
      }
    }
  } else {
    if (favorited) {
      yield put({ type: FAVORITE_ARTICLE_ERRORS, error: res });
    } else {
      yield put({ type: REMOVE_FAVORITE_ARTICLE_ERRORS, error: res });
    }
  }
}

function* favoriteWatcher() {
  yield takeEvery(FAVORITE_ARTICLE_REQUEST, favoriteFlow);
}

export default favoriteWatcher;
