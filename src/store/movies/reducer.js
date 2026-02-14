import { createSlice } from "@reduxjs/toolkit";

const FAVORITES_STORAGE_KEY = "filmix_favorites";

function getFavoritesFromStorage() {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const initialState = {
  list: { data: null, loading: false, error: null },
  details: { data: null, loading: false, error: null },
  favorites: getFavoritesFromStorage(),
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase("FETCH_MOVIES_PENDING", (state) => {
        state.list.loading = true;
        state.list.error = null;
      })
      .addCase("FETCH_MOVIES_OK", (state, { payload }) => {
        state.list.data = payload;
        state.list.loading = false;
        state.list.error = null;
      })
      .addCase("FETCH_MOVIES_ERROR", (state, { payload }) => {
        state.list.loading = false;
        state.list.error = payload;
      })
      .addCase("FETCH_MOVIE_DETAILS", (state) => {
        state.details.loading = true;
        state.details.error = null;
      })
      .addCase("FETCH_MOVIE_DETAILS_OK", (state, { payload }) => {
        state.details.data = payload;
        state.details.loading = false;
        state.details.error = null;
      })
      .addCase("FETCH_MOVIE_DETAILS_ERROR", (state, { payload }) => {
        state.details.loading = false;
        state.details.error = payload;
      })
      .addCase("ADD_FAVORITE", (state, { payload }) => {
        if (!state.favorites.some((f) => f.id === payload.id)) {
          state.favorites.push(payload);
        }
      })
      .addCase("REMOVE_FAVORITE", (state, { payload }) => {
        state.favorites = state.favorites.filter((f) => f.id !== payload);
      });
  },
});

export { FAVORITES_STORAGE_KEY };
export default moviesSlice.reducer;
