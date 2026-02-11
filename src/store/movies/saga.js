import { call, put, takeLatest } from 'redux-saga/effects'

function* fetchMoviesSaga({ payload: page = 1, filterId = 'popular' }) {
  try {
    const res = yield call(
      fetch,
      `https://api.themoviedb.org/3/movie/${filterId}?language=en-US&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
        },
      }
    )
    if (!res.ok) throw new Error(res.statusText)
    const data = yield call([res, 'json'])
    yield put({
      type: 'FETCH_MOVIES_OK',
      payload: { movies: data?.results, totalPages: data?.total_pages },
    })
  } catch (e) {
    yield put({ type: 'FETCH_MOVIES_ERROR', payload: e.message })
  }
}

function* fetchMovieDetailsSaga({ payload: movieId }) {
  try {
    const res = yield call(
      fetch,
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
        },
      }
    )
    if (!res.ok) throw new Error(res.statusText)
    const data = yield call([res, 'json'])
    yield put({ type: 'FETCH_MOVIE_DETAILS_OK', payload: data })
  } catch (e) {
    yield put({ type: 'FETCH_MOVIE_DETAILS_ERROR', payload: e.message })
  }
}

export default function* moviesSaga() {
  yield takeLatest('FETCH_MOVIES_PENDING', fetchMoviesSaga)
  yield takeLatest('FETCH_MOVIE_DETAILS', fetchMovieDetailsSaga)
}
