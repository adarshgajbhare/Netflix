import { createSlice } from "@reduxjs/toolkit";

const showsSlice = createSlice({
  name: "shows",
  initialState: {
    topShows: null,
  },
  reducers: {
    addTopShows: (state, action) => {
      state.topShows = action.payload;
    },
  },
});

export default showsSlice.reducer;
export const { addTopShows } = showsSlice.actions;
 