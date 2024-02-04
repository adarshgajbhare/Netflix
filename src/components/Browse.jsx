/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { removeUser } from "../utils/userSlice";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopMovies from "../hooks/useTopMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useTopShows from "../hooks/useTopShows";
import { useState } from "react";
const Browse = () => {
  const [showTv, setShowTv] = useState(false);
  useNowPlayingMovies();
  usePopularMovies();
  useTopMovies();
  useUpcomingMovies();

  const dispatch = useDispatch();

  const user = useSelector((store) => store?.user);

  const HandleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  const HandleTvShows = () => {
    console.log("Enter tv show");
   // useTopShows();
    setShowTv(true);
  };
  return (
    <div className="main-container relative w-full min-h-full overflow-x-hidden">
      <div className="absolute inset-0 -z-10   [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <div className="mobile 2xl:hidden lg:hidden">
        <div className="navbar z-50 bg-glass fixed w-full text-center flex justify-between items-center p-2">
          <div className="">
            <Header />
          </div>
          <i
            onClick={HandleSignOut}
            className="fa-solid fa-power-off text-white text-3xl pr-2"
          ></i>
        </div>
      </div>
     
      <div className="text-white text-sm font-bold mt-20 z-50 flex items-center justify-between gap-2  2xl:hidden lg:hidden ">
        <button
          onClick={HandleTvShows}
          className="flex-1 rounded-[100vw] border-2 py-2 px-2  "
        >
          Tv Shows
        </button>
        <button className="flex-1 rounded-[100vw] border-2 py-2 px-2  ">
          Movies
        </button>
        <button className="flex-1 rounded-[100vw] border-2 py-2 px-2  w-min-0">
          Categories
          <i className="fa-sharp fa-solid fa-chevron-down ml-2"></i>
        </button>
      </div>
      <MainContainer show={showTv} />
      <SecondaryContainer show={showTv} />{" "}
    </div>
  );
};
export default Browse;
