import { createSelector } from '@reduxjs/toolkit'

const details = (s) => s.movies.details

export const selectListState = createSelector(
  [(state) => state.movies, (_, filterId) => filterId],
  (moviesState, filterId) => {
    if (filterId === 'favorites') {
      return {
        movies: moviesState.favorites ?? [],
        loading: false,
        error: null,
        totalPages: 0,
      }
    }
    const list = moviesState.list
    return {
      movies: list?.data?.movies ?? [],
      loading: list.loading,
      error: list.error,
      totalPages: list?.data?.totalPages ?? 0,
    }
  }
)

export const selectDetailsData = createSelector([details], (detailsSlice) => ({
  data: detailsSlice.data,
  loading: detailsSlice.loading,
  error: detailsSlice.error,
}))

export const selectIsFavorite = (s, movieId) =>
  s.movies.favorites.some((f) => f.id === movieId)
