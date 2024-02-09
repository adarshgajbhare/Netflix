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
      state.favoriteMovies = [...state.favoriteMovies, action.payload];
    },
    addFavoriteShows: (state, action) => {
      state.favoriteShows = [...state.favoriteShows, action.payload];
    },
    addWatchLaterMovies: (state, action) => {
      state.watchLaterMovies = [...state.watchLaterMovies, action.payload];
    },
    addWatchLaterShows: (state, action) => {
      state.watchLaterShows = [...state.watchLaterShows, action.payload];
    },
  },
});

export const {
  addFavoriteMovies,
  addFavoriteShows,
  addWatchLaterMovies,
  addWatchLaterShows,
} = savedSlice.actions;

export default savedSlice.reducer;
