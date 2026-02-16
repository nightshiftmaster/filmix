export const fetchMovies = (page = 1, filterId) => ({
  type: "FETCH_MOVIES_PENDING",
  payload: page,
  filterId,
});

export const fetchMovieDetails = (movieId) => ({
  type: "FETCH_MOVIE_DETAILS",
  payload: movieId,
});

export const addFavorite = (movie) => ({
  type: "ADD_FAVORITE",
  payload: movie,
});

export const removeFavorite = (movieId) => ({
  type: "REMOVE_FAVORITE",
  payload: movieId,
});
