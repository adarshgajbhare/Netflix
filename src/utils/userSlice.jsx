import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  favoriteMovies: null,
  favoriteShows: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },

    removeUser: () => {
      return null;
    },
    addFavoriteMovies: (state, action) => {
      return (state.favoriteMovies = action.payload);
    },
    addFavoriteShows: (state, action) => {
      return (state.favoriteShows = action.payload);
    },
  },
});

export default userSlice.reducer;
export const { addUser, removeUser, addFavoriteShows, addFavoriteMovies } =
  userSlice.actions;
