import { call, takeEvery, put, select } from "redux-saga/effects";
import { favoriteArticle, fetchArticles } from "../../../apis/articles";
import { articlesState } from '../../../selectors';

import {
  FAVORITE_ARTICLE_SUCCESS,
  FAVORITE_ARTICLE_ERRORS,
  REMOVE_FAVORITE_ARTICLE_SUCCESS,
  REMOVE_FAVORITE_ARTICLE_ERRORS,
  FAVORITE_ARTICLE_REQUEST,
} from "./constants";
import { FETCH_ARTICLES_SUCCESS } from "../constants";
import { favoriteArticleRequest } from "./actions";
import { Article } from "../../type";
import { Articles } from "../../type";
import { store } from "../../store";

interface FetchArticlesRes {
  status: number;
  data: Articles;
}
interface Res {
  status: number;
  data: Article;
}

function* favoriteArticlesApi(favorited: boolean, slug: string | undefined) {
  const payload = {
    favorited,
    slug,
  };

  const res: Res = yield call(favoriteArticle, payload);
  console.log(res);

  return res;
}
function* favoriteFlow({ payload }: ReturnType<typeof favoriteArticleRequest>) {

  const res: Res = yield call(favoriteArticlesApi, payload.favorited, payload.slug);
  const favorited = res?.data?.article?.favorited;

  const articlesList: any[] = yield select(articlesState);


  if (res.status === 200) {
    articlesList[payload.index] = res.data.article;

    if (favorited) {
      yield put({ type: FAVORITE_ARTICLE_SUCCESS });

    } else {
      yield put({ type: REMOVE_FAVORITE_ARTICLE_SUCCESS });
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
