import { signupReducer } from "./state/signup";
import { loginReducer } from "./state/login";
import { actionUserReducer } from "./state/user";
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
import { profileUserReducer } from "./state/profile";
import { SignUpState } from "./state/signup/reducer";
import { LoginState } from "./state/login/reducer";
import { UserState } from "./state/user/reducer";
import { ClientState } from "./state/client/reducer";
import { SettingsState } from "./state/settings/reducer";
import { FavoriteArticleState } from "./state/articles/favourites/reducer";
import { DetailArticleState } from "./state/articles/detail/reducer";
import { DeleteArticleState } from "./state/articles/deleteReducer";
import { ListArticleState } from "./state/articles/reducer";
import { PublishArticleState } from "./state/articles/publish/reducer";
import { TagArticleState } from "./state/articles/tags/reducer";
import { ListCommentState } from "./state/articles/comments/reducer";
import { AddCommentState } from "./state/articles/comments/addCommentReducer";
import { DeleteCommentState } from "./state/articles/comments/deleteCommentReducer";
import { FollowAuthorState } from "./state/articles/follow/reducer";
import { ProfileState } from "./state/profile/reducer";
import { combineReducers } from "redux";

export interface IrootReducer {
  signup: SignUpState;
  login: LoginState;
  user: UserState;
  client: ClientState;
  settings: SettingsState;
  favorites: FavoriteArticleState;
  detailArticle: DetailArticleState;
  deleteArticle: DeleteArticleState;
  publishArticle: PublishArticleState;
  articles: ListArticleState;
  commentsArticle: ListCommentState;
  addCommentArticle: AddCommentState;
  deleteCommentArticle: DeleteCommentState;
  addTagArticle: TagArticleState;
  followAuthorArticle: FollowAuthorState;
  fetchProfileUser: ProfileState;
}
const rootReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
  user: actionUserReducer,
  client: clientReducer,
  settings: settingsReducer,
  favorites: favoriteArticlesReducer,
  detailArticle: detailArticleReducer,
  deleteArticle: deleteArticleReducer,
  publishArticle: publishArticleReducer,
  articles: articlesReducer,
  commentsArticle: fetchCommentsReducer,
  addCommentArticle: addCommentReducer,
  deleteCommentArticle: deleteCommentReducer,
  addTagArticle: addTagArticleReducer,
  followAuthorArticle: followAuthorReducer,
  fetchProfileUser: profileUserReducer,
});

export default rootReducer;
