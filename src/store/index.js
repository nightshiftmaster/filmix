import { configureStore, combineReducers } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import moviesReducer from './movies/reducer'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  movies: moviesReducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export default store
