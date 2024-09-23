/* eslint-disable no-unused-vars */
import { POSTER_URL, SERIES_POSTER_URL } from "../utils/constant";
import { Link } from "react-router-dom";
import Tilt from "react-vanilla-tilt";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { removeUser } from "../utils/userSlice";
import { useState } from "react";
import useShowTrailer from "../hooks/useShowTrailer";
import React from "react";
import Navbar from "./Navbar";

// eslint-disable-next-line react/prop-types
const MainPoster = ({ title, poster_path, original_title, id }) => {
  const user = useSelector((store) => store?.user);
  const [isSeries, setIsSeries] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const video = useSelector((store) => store?.movies?.trailerVideo);
  const dispatch = useDispatch();

  useMovieTrailer({ id });
  useShowTrailer({ id });

  const HandleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
      })
      .catch((error) => {});
  };

  const HandleTvShows = () => {
    setIsSeries(!isSeries);
  };

  return (
    <div className="p-5">
      <Tilt
        options={{
          scale: 1,
          glare: true,
          "max-glare": 0.5,
          "glare-prerender": true,
        }}
        style={{}}>
        <div className="mainPoster mobile 2xl:hidden lg:hidden">
          <div className="img-container  relative rounded-xl overflow-hidden md:scale-75">
            <div className="absolute inset-0  bg-gradient-to-t  opacity-75 from-black"></div>

            <div className="text-black  p-4 gap-2 flex items-center  absolute bottom-0 w-full md:p-8 md:gap-5">
              <div className=" flex-1 w-full ">
                <button className=" font-bold text-md rounded-sm btn px-3 py-2 w-full play  text-[#131313] bg-white md:px-10 md:py-8 md:text-3xl">
                  <i className="fa-solid fa-play mr-2 text-xl md:text-3xl"></i>{" "}
                  Play
                </button>
              </div>
              <div className="flex-1 w-full ">
                <button className="hover:bg-glass font-bold text-md rounded-sm btn px-3 py-2 w-full  my-list bg-[#131313] text-white md:px-10 md:py-8 md:text-3xl">
                  <i className="fa-solid fa-plus mr-2 text-xl md:text-3xl"></i>{" "}
                  My List
                </button>
              </div>
            </div>
            {isSeries ? (
              <img
                className="h-full w-full "
                src={SERIES_POSTER_URL + poster_path}
              />
            ) : (
              <img className="h-full w-full " src={POSTER_URL + poster_path} />
            )}
          </div>{" "}
        </div>
      </Tilt>
      <div className="">
        <Navbar />
      </div>
    </div>
  );
};

export default MainPoster;
