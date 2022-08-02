import { signupReducer } from "./state/signup";
import { loginReducer } from "./state/login";
import { clientReducer } from "./state/client";
import { articlesReducer } from "./state/articles";

import { combineReducers } from "redux";

const IndexReducer = combineReducers({
  signupReducer,
  loginReducer,
  clientReducer,
  articlesReducer
});

export default IndexReducer;
