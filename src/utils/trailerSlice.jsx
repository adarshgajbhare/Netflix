import { createSlice } from "@reduxjs/toolkit";

const trailerSlice = createSlice({
  name: "trailers",
  initialState: {
    bigShowTrailer: null,
    bigMovieTrailer: null,
  },
  reducers: {
    addBigShowTrailer:(state ,action) =>{
        state.bigShowTrailer = action.payload;
    },
    addBigMovieTrailer: (state, action) => {
        state.bigMovieTrailer = action.payload;
      },
    resetMovieTrailer: (state, ) => {
        state.bigMovieTrailer = null;
      },
    resetSeriesTrailer: (state, ) => {
        state.bigShowTrailer = null;
      },
  },
});

export default trailerSlice.reducer;
export const {resetSeriesTrailer , resetMovieTrailer, addBigShowTrailer , addBigMovieTrailer } = trailerSlice.actions;
