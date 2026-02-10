export const FETCH_POPULAR = 'movies/FETCH_POPULAR'
export const fetchPopular = (page = 1) => ({
  type: FETCH_POPULAR,
  payload: page,
})
