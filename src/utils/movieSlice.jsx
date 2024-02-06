import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    topMovies: null,
    upcomingMovies: null,
    trailerVideo:null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopMovies: (state, action) => {
      state.topMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addMoviesTrailer: (state, action) => {
      state.trailerVideo = action.payload;
    },
  },
});
 
export default movieSlice.reducer;
export const {addMoviesTrailer, addUpcomingMovies, addNowPlayingMovies, addPopularMovies , addTopMovies } = movieSlice.actions;
