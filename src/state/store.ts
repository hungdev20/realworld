import { createStore, applyMiddleware } from "redux";
import { persistStore } from 'redux-persist';
import createSagaMiddleware from "redux-saga";
import persistedReducer from "../index-reducer";
import IndexSaga from "../index-sagas";

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
const persistor = persistStore(store);
sagaMiddleware.run(IndexSaga);
export { persistor };
export default store;
