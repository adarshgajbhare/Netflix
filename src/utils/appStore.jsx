import { configureStore } from "@reduxjs/toolkit";
 import userReducer from "./userSlice";
 import moviesReducer from "./movieSlice";
 import showReducer from "./showsSlice";
const appStore = configureStore({
  reducer: {
    user : userReducer,
    movies : moviesReducer,
    shows : showReducer,
  },
});

export default appStore;
