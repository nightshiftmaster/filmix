import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import moviesReducer, { FAVORITES_STORAGE_KEY } from "./movies/reducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  movies: moviesReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

let lastSavedFavorites = "";

store.subscribe(() => {
  const serialized = JSON.stringify(store.getState().movies.favorites ?? []);
  if (serialized === lastSavedFavorites) return;
  lastSavedFavorites = serialized;
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, serialized);
  } catch {}
});

sagaMiddleware.run(rootSaga);

export default store;
