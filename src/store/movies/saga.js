import { call, put, takeLatest } from 'redux-saga/effects'

function* fetchPopular({ payload: page = 1 }) {
  try {
    const res = yield call(
      fetch,
      `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
        },
      }
    )
    const data = yield call([res, 'json'])
    yield put({
      type: 'movies/FETCH_POPULAR_OK',
      payload: { movies: data?.results, totalPages: data?.total_pages },
    })
  } catch (e) {
    yield put({ type: 'movies/FETCH_POPULAR_FAIL', payload: e.message })
  }
}

export default function* moviesSaga() {
  yield takeLatest('movies/FETCH_POPULAR', fetchPopular)
}
