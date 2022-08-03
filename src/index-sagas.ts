import signupWatcher from "./state/signup/sagas";
import loginWatcher from "./state/login/sagas";
import articlesWatcher from "./state/articles/sagas";
import favoriteWatcher from "./state/articles//favourites/sagas";
import { all } from "redux-saga/effects";

export default function* IndexSaga() {
  yield all([
    signupWatcher(),
    loginWatcher(),
    articlesWatcher(),
    favoriteWatcher()
  ]);
}
