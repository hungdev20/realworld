import signupWatcher from "./state/signup/sagas";
import loginWatcher from "./state/login/sagas";
import getSettingsWatcher from "./state/settings/sagas";
import updateSettingsWatcher from "./state/settings/updateSagas";
import articlesWatcher from "./state/articles/sagas";
import deleteArticleWatcher from "./state/articles/deleteSagas";
import favoriteWatcher from "./state/articles/favourites/sagas";
import detailArticleWatcher from "./state/articles/detail/sagas";
import fetchCommentsWatcher from "./state/articles/comments/sagas";
import addCommentWatcher from "./state/articles/comments/addCommentSagas";
import deleteCommentWatcher from "./state/articles/comments/deleteCommentSagas";
import followAuthorWatcher from "./state/articles/follow/sagas";
import fetchProfileUserWatcher from "./state/user/sagas";
import {addTagWatcher} from "./state/articles/tags"
import {publishArticleWatcher} from "./state/articles/publish"
import {editArticleWatcher} from "./state/articles/publish"
import {removeTagWatcher} from "./state/articles/tags"
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
    followAuthorWatcher(),
    fetchProfileUserWatcher(),
    deleteArticleWatcher(),
    addTagWatcher(),
    publishArticleWatcher(),
    editArticleWatcher(),
    removeTagWatcher()
  ]);
}
