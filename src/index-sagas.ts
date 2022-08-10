import signupWatcher from "./state/signup/sagas";
import loginWatcher from "./state/login/sagas";
import getSettingsWatcher from "./state/settings/sagas";
import updateSettingsWatcher from "./state/settings/updateSagas";
import articlesWatcher from "./state/articles/sagas";
import favoriteWatcher from "./state/articles/favourites/sagas";
import detailArticleWatcher from "./state/articles/detail/sagas";
import fetchCommentsWatcher from "./state/articles/comments/sagas";
import addCommentWatcher from "./state/articles/comments/addCommentSagas";
import deleteCommentWatcher from "./state/articles/comments/deleteCommentSagas";
import followAuthorWatcher from "./state/articles/follow/sagas";
import { all } from "redux-saga/effects";

export default function* IndexSaga() {
  yield all([
    signupWatcher(),
    loginWatcher(),
    articlesWatcher(),
    favoriteWatcher(),
    getSettingsWatcher(),
    updateSettingsWatcher(),
    detailArticleWatcher(),
    fetchCommentsWatcher(),
    addCommentWatcher(),
    deleteCommentWatcher(),
    followAuthorWatcher()
  ]);
}
