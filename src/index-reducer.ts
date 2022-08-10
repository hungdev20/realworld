import { signupReducer } from "./state/signup";
import { loginReducer } from "./state/login";
import { clientReducer } from "./state/client";
import { settingsReducer } from "./state/settings";
import { articlesReducer } from "./state/articles";
import { fetchCommentsReducer } from "./state/articles/comments";
import { addCommentReducer } from "./state/articles/comments";
import { deleteCommentReducer } from "./state/articles/comments";
import { detailArticleReducer } from "./state/articles/detail";
import { followAuthorReducer } from "./state/articles/follow";

import { favoriteArticlesReducer } from "./state/articles/favourites";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from "redux";

const articlesPersistConfig = {
  key: 'articles',
  storage: storage,
};
const settingsPersistConfig = {
  key: 'settings',
  storage: storage,
};

const rootReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
  client: clientReducer,
  settings: persistReducer(settingsPersistConfig, settingsReducer),
  favorites: favoriteArticlesReducer,
  detailArticle: detailArticleReducer,
  commentsArticle: fetchCommentsReducer,
  addCommentArticle: addCommentReducer,
  followAuthorArticle: followAuthorReducer,
  deleteCommentArticle: deleteCommentReducer,
  articles: persistReducer(articlesPersistConfig, articlesReducer)
});

export default rootReducer;
