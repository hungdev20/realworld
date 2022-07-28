import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import signupReducer from "./signup/reducer";
import signupWatcher from "./signup/sagas";

const rootReducer = combineReducers({ signupReducer });

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(signupWatcher);
export default store;
