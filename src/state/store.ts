import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../index-reducer"; 
import IndexSaga from "../index-sagas";

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(IndexSaga);
export default store;
