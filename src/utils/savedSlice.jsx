import { createSlice } from "@reduxjs/toolkit";

const savedSlice = createSlice({
  name: "savedInfo",
  initialState: {
    favoriteMovies: [],
    favoriteShows: [],
    watchLaterMovies: [],
    watchLaterShows: [],
  },

  reducers: {
    addFavoriteMovies: (state, action) => {
      const exists = state.favoriteMovies.some(
        (item) => item?.id === action.payload?.id
      );
      if (!exists) {
        state.favoriteMovies = [...state.favoriteMovies, action.payload];
      }
    },
    addFavoriteShows: (state, action) => {
      const exists = state.favoriteShows.some(
        (item) => item?.id === action.payload?.id
      );
      if (!exists) {
        state.favoriteShows = [...state.favoriteShows, action.payload];
      }
    },
    addWatchLaterMovies: (state, action) => {
      const exists = state.watchLaterMovies.some(
        (item) => item?.id === action.payload?.id
      );
      if (!exists) {
        state.watchLaterMovies = [...state.watchLaterMovies, action.payload];
      }
    },
    addWatchLaterShows: (state, action) => {
      const exists = state.watchLaterShows.some(
        (item) => item?.id === action.payload?.id
      );
      if (!exists) {
        state.watchLaterShows = [...state.watchLaterShows, action.payload];
      }
    },
    removeFavoriteMovie: (state, action) => {
      state.favoriteMovies = state.favoriteMovies.filter(
        (item) => item?.id !== action.payload
      );
    },
    removeWatchLaterMovie: (state, action) => {
      state.watchLaterMovies = state.watchLaterMovies.filter(
        (item) => item?.id !== action.payload
      );
    },
  },
});

export const {
  addFavoriteMovies,
  addFavoriteShows,
  addWatchLaterMovies,
  addWatchLaterShows,
  removeFavoriteMovie,
  removeWatchLaterMovie,
} = savedSlice.actions;

export default savedSlice.reducer;
