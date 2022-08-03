import { call, put, fork, take, takeEvery } from "redux-saga/effects";
import favoriteArticle from "../../../apis/favoriteArticle";
import {
    LIKE_ARTICLE_SUCCESS,
    LIKE_ARTICLE_ERRORS,
    REMOVE_LIKE_ARTICLE_SUCCESS,
    REMOVE_LIKE_ARTICLE_ERRORS,
    FAVORITE_ARTICLE_REQUEST

} from "./constants"; 
import { favoriteArticleRequest } from "./actions"

function* articlesApi(favorited: boolean, slug: string) {
  const payload = {
    favorited,
    slug,
  };

  const res:number = yield call(favoriteArticle, payload);
  console.log(res);
  
  // return res;
}
function* favoriteFlow({ payload }: ReturnType<typeof favoriteArticleRequest>) {
  
  const res: number = yield call(articlesApi, payload.favorited, payload.slug);
//   if (res.status === 200) {
//     yield put({ type: FETCH_ARTICLES_SUCCESS, data: res.data });
//   } else {
//     yield put({ type: FETCH_ARTICLES_ERRORS, error: res });
//   }
}

function* favoriteWatcher() {
  yield takeEvery(FAVORITE_ARTICLE_REQUEST, favoriteFlow);
}

export default favoriteWatcher;
