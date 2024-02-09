import { configureStore } from "@reduxjs/toolkit";
 import userReducer from "./userSlice";
 import moviesReducer from "./movieSlice";
 import showReducer from "./showsSlice";
 import trailers from "./trailerSlice"
 import savedInfo from "./savedSlice"
const appStore = configureStore({
  reducer: {
    user : userReducer,
    movies : moviesReducer,
    shows : showReducer,
    trailers : trailers,
    savedInfo: savedInfo,
  },
});

export default appStore;
