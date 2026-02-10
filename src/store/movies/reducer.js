const init = { popular: null, loading: false, error: null }

export default function moviesReducer(state = init, { type, payload }) {
  if (type === 'movies/FETCH_POPULAR')
    return { ...state, loading: true, error: null }
  if (type === 'movies/FETCH_POPULAR_OK')
    return { ...state, popular: payload, loading: false }
  if (type === 'movies/FETCH_POPULAR_FAIL')
    return { ...state, error: payload, loading: false }
  return state
}
