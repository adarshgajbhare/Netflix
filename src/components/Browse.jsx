/* eslint-disable react/prop-types */
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
import {  useState } from "react";

const Browse = (  ) => {
  const [showTv, setShowTv] = useState(false);
  const [isVolume, setIsVolume] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((store) => store?.user);
  const video = useSelector((store) => store?.movies?.trailerVideo);
  useNowPlayingMovies();
  usePopularMovies();
  useTopMovies();
  useUpcomingMovies();

  const movies = useSelector((store) => store?.movies?.nowPlayingMovies);
  if (!movies) return;

  const mainMovie = movies[1];
  const { original_title, title, overview, id } = mainMovie;
  console.log(mainMovie);

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
    
    setShowTv(true);
  };

  const HandleVolume = () => {
    setIsVolume(!isVolume);
  };

  const youtubeEmbedUrl = `https://www.youtube.com/embed/${
    video?.key
  }?rel=0&modestbranding=1&autohide=1&autoplay=1&showinfo=0&controls=0&loop=1&modestbranding=1&fs=0&cc_load_policy=0&iv_load_policy=0&autohide=0&mute=${
    isVolume ? "" : 1
  }`;

  return (
    <div className="main-container relative w-full min-h-full overflow-x-hidden">
      <div className="absolute inset-0 -z-10   [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <div className="absolute h-[100vh] w-full  -z-10  inset-0  ">
        <iframe
          className="hidden 2xl:block lg:block h-full w-full object-cover scale-150 bg-gradient-to-t from-black"
          src={youtubeEmbedUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
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
          className="flex-1 rounded-[100vw] border-2 py-2 px-2"
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
      <MainContainer />
      <SecondaryContainer />
      <div
        className="hidden 2xl:block lg:block absolute w-[500px] h-[450px] top-56 left-[55px]  gap-4 rounded-md    
        flex-col   z-[999]"
      >
        <div className="  font-bold tracking-tighter child title text-5xl overflow-hidden text-white relative p-4">
          {/* <div className=" overlay inset-0 bg-black opacity-10 h-full w-full absolute -z-10 "> </div> */}
          {title ? title : original_title}
        </div>

        <div className="   child plot overflow-hidden  text-white relative p-4">
          {/* <div className="overlay inset-0 bg-black opacity-50 h-full w-full absolute -z-10"> </div> */}
          {overview}
        </div>

        <div className=" gap-4  flex items-center overflow-hidden bg-transparent px-4">
          <div className="grow ">
            <button className="bg-hotstar font-bold text-md rounded-md  text-white bg-transparent  items-center justify-center  py-4 w-full">
              <i className="fa-solid fa-play mr-2 text-xl hover:text-5xl"></i>{" "}
              <span> Watch Now </span>
            </button>
          </div>
          <div className="hover:cursor-pointer flex justify-around">
            <button className="bg-hotstar    font-bold text-md rounded-md  bg-transparent text-white flex-none items-stretch px-6 py-4">
              <i className="fa-solid fa-plus text-xl"></i>
            </button>
          </div>
          <div className="hover:cursor-pointer ">
            <button
              onClick={HandleVolume}
              className=" bg-hotstar font-bold text-md rounded-md  bg-transparent text-white flex-none items-stretch px-6 py-4"
            >
              {isVolume ? (
                <i className="fa-solid fa-volume-high 2xl"></i>
              ) : (
                <i className="fa-solid fa-volume-xmark 2xl"></i>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Browse;
