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
import { useState } from "react";
import { Link } from "react-router-dom";
import TopSmallNav from "./TopSmallNav";
import React from "react";
import Recommendations from "./Recommendations";
import { IconPlus, IconVolume, IconVolumeOff } from "@tabler/icons-react";
const Browse = () => {
  const { movieCards, setMoovieCards } = useState(false);

  const dispatch = useDispatch();
  const video = useSelector((store) => store?.movies?.trailerVideo);

  const [isVolume, setIsVolume] = useState(false);

  useNowPlayingMovies();
  usePopularMovies();
  useTopMovies();
  useUpcomingMovies();

  const movies = useSelector((store) => store?.movies?.nowPlayingMovies);
  const allMovies = useSelector((store) => store?.movies);

  if (!allMovies) return null;
  if (!movies) return;

  const mainMovie = movies[1];
  const { original_title, title, overview, id, poster_path } = mainMovie;

  const HandleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
      })
      .catch((error) => {});
  };

  const HandleVolume = () => {
    setIsVolume(!isVolume);
  };

  const moviesYoutube = `https://www.youtube.com/embed/${
    video?.key
  }?rel=0&modestbranding=1&autohide=1&autoplay=1&showinfo=0&controls=0&loop=1&modestbranding=1&fs=0&cc_load_policy=0&iv_load_policy=0&autohide=0&mute=${
    isVolume ? "" : 1
  }`;
  return (
    <>
      <div className="main-container relative w-full min-h-full overflow-x-hidden ">
        <div className="absolute inset-0 -z-10  bg-[#131313]"></div>
        <div className="absolute h-full  w-full  -z-10  inset-0  ">
          <div className="absolute inset-0 size-full bg-gradient-to-r from-black to-black/10 z-50">
            
          </div>
          <iframe
            className="hidden 2xl:block lg:block h-screen w-full object-cover scale-150 
            bg-gradient-to-t from-black"
            src={moviesYoutube}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; 
            picture-in-picture; web-share"
          ></iframe>
        </div>
        <div className="mobile 2xl:hidden lg:hidden">
          <div
            className="navbar z-50 bg-glass fixed w-full text-center flex 
          justify-between items-center p-2"
          >
            <div className="">
              <Header />
            </div>
            <i
              onClick={HandleSignOut}
              className="fa-solid fa-power-off text-white text-3xl pr-2"
            ></i>
          </div>
        </div>
        <TopSmallNav />
        <MainContainer
          original_title={original_title}
          tittle={title}
          overview={overview}
          id={id}
          poster_path={poster_path}
        />
        <SecondaryContainer isSeries={movieCards} allMovies={allMovies} />
        <div
          className="hidden 2xl:block lg:block   absolute w-1/3   xl:flex   top-44 left-10  gap-5  rounded-md    
        flex-col   z-[999]"
        >
          <div className="  font-bold tracking-tight child title text-6xl overflow-hidden text-white relative">
            {title ? title : original_title}
          </div>

          <div className=" overflow-hidden  text-white/70 text-xl text-pretty font-semibold  relative w-full ">
            {overview.split(" ").slice(0, 50).join(" ") + "..."}
          </div>

          <div className=" gap-4  flex items-center overflow-hidden bg-transparent ">
            <div className="grow ">
              <button className="bg-white font-bold text-xl rounded-md  text-black  items-center justify-center  py-4 w-full">
                <i className="fa-solid fa-play mr-2 text-xl hover:text-5xl"></i>{" "}
                <span> Watch Now </span>
              </button>
            </div>
            <div className="hover:cursor-pointer flex justify-around">
              <button className="bg-white    font-bold text-md rounded-md   text-black flex-none items-stretch px-6 py-4">
                <IconPlus size={24} stroke={3} color="black" />
              </button>
            </div>
            <div className="hover:cursor-pointer ">
              <button
                onClick={HandleVolume}
                className=" bg-white font-bold text-md rounded-md   text-black flex-none items-stretch px-6 py-4"
              >
                {isVolume ? (
                  <IconVolume size={24} stroke={2} color="black" />
                ) : (
                  <IconVolumeOff size={24} stroke={2} color="black" />
                )}
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};
export default Browse;
