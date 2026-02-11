import { createSelector } from '@reduxjs/toolkit'

const details = (s) => s.movies.details
const favorites = (s) => s.movies.favorites

export const selectListState = createSelector(
  [(state) => state.movies.list],
  (list) => ({
    movies: list?.data?.movies ?? [],
    loading: list.loading,
    error: list.error,
    totalPages: list?.data?.totalPages ?? 0,
  })
)

export const selectDetailsData = createSelector([details], (detailsSlice) => ({
  data: detailsSlice.data,
  loading: detailsSlice.loading,
  error: detailsSlice.error,
}))

export const selectIsFavorite = (s, movieId) =>
  favorites(s).some((f) => f.id === movieId)
