import { signupReducer } from "./state/signup";
import { loginReducer } from "./state/login";
import { clientReducer } from "./state/client";
import { settingsReducer } from "./state/settings";
import { articlesReducer } from "./state/articles";
import { deleteArticleReducer } from "./state/articles";
import { fetchCommentsReducer } from "./state/articles/comments";
import { addCommentReducer } from "./state/articles/comments";
import { deleteCommentReducer } from "./state/articles/comments";
import { detailArticleReducer } from "./state/articles/detail";
import { followAuthorReducer } from "./state/articles/follow";
import { publishArticleReducer } from "./state/articles/publish";
import { addTagArticleReducer } from "./state/articles/tags";

import { favoriteArticlesReducer } from "./state/articles/favourites";
import { profileUserReducer } from "./state/user";

import { combineReducers } from "redux";

const rootReducer = combineReducers({ 
  signup: signupReducer,
  login: loginReducer,
  client: clientReducer,
  settings: settingsReducer,
  favorites: favoriteArticlesReducer,
  detailArticle: detailArticleReducer,
  deleteArticle: deleteArticleReducer,
  commentsArticle: fetchCommentsReducer,
  addCommentArticle: addCommentReducer,
  followAuthorArticle: followAuthorReducer,
  deleteCommentArticle: deleteCommentReducer,
  fetchProfileUser: profileUserReducer,
  publishArticle: publishArticleReducer,
  addTagArticle: addTagArticleReducer,
  articles: articlesReducer
});

export default rootReducer;
