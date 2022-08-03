import { signupReducer } from "./state/signup";
import { loginReducer } from "./state/login";
import { clientReducer } from "./state/client";
import { articlesReducer } from "./state/articles";
import { favoriteArticlesReducer } from "./state/articles/favourites";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from "redux";

const rootPersistConfig = {
  key: 'root',
  storage: storage,
};

const articlesPersistConfig = {
  key: 'articles',
  storage: storage,
};
const rootReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
  client: clientReducer,
  favorites: favoriteArticlesReducer,
  articles: persistReducer(articlesPersistConfig, articlesReducer)
});

export default persistReducer(rootPersistConfig, rootReducer);
