import { createSlice } from "@reduxjs/toolkit";

const showsSlice = createSlice({
  name: "shows",
  initialState: {
    topShows: null,
    showTrailer: null,
    popularShow: null,
    onAirShow : null,
    arrivingTodayShow : null,
    searchedShows : null,
    
  },
  reducers: {
    addTopShows: (state, action) => {
      state.topShows = action.payload;
    },
    addShowTrailer:(state ,action) =>{
        state.showTrailer = action.payload;
    },
    addPopularShows:(state ,action) =>{
        state.popularShow = action.payload;
    },
    addOnAirShows:(state ,action) =>{
        state.onAirShow = action.payload;
    },
    addArrivingTodayShows:(state ,action) =>{
        state.arrivingTodayShow = action.payload;
    },
   
    searchedShows:(state ,action) =>{
        state.searchedShows = action.payload;
    },
   
  },
});
 
export default showsSlice.reducer;
export const {searchedShows ,addTopShows , addShowTrailer , addPopularShows ,addOnAirShows , addArrivingTodayShows , addBigTrailer} = showsSlice.actions;
 