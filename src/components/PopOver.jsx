/* eslint-disable react/prop-types */

import React, { useState } from "react";
import { POSTER_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteMovies, addWatchLaterMovies } from "../utils/savedSlice";
import { Link, NavLink } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../utils/firebase";

import Recommendations from "./Recommendations";
import {
  IconHeartFilled,
  IconPlayerPlay,
  IconPlayerPlayFilled,
  IconPlus,
} from "@tabler/icons-react";
const PopOver = ({
  movie,
  id,
  poster_path,
  title,
  overview,
  backdrop_path,
}) => {
  const WatchLater = collection(database, "WatchLater");
  const Favorite = collection(database, "Favorite");

  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useDispatch();

  const email = useSelector((store) => store.user.email);

  const HandleWatchLater = () => {
    setIsClicked(true);
    dispatch(addWatchLaterMovies(movie));
    addDoc(WatchLater, { movies: movie, email: email });
  };
  const HandleFavorite = () => {
    setIsClicked(true);
    dispatch(addFavoriteMovies(movie));
    addDoc(Favorite, { movies: movie, email: email });
  };
  // const HandleHover = (shape) => {
  //   console.log("shape is ", "" + shape);
  //   gsap.to(`${shape}`, {
  //     rotate: 360,
  //     scale: 1.2,
  //     duration: 0.2,
  //   });
  // };
  const HandleRec = () => {
    <Recommendations vis={true} />;
    document.querySelector(".main-rec").classList.remove("hidden");
  };
  return (
    <>
      <div className="fixed z-50 inset-0 size-full overflow-hidden bg-black/70 filter backdrop-blur-sm ">
        <div className="absolute top-1/2 left-1/2 flex  -translate-x-1/2 -translate-y-1/2 bg-[#242423] filter backdrop-blur-3xl 
        w-3/5 h-[90%] rounded-lg overflow-hidden ">
          <div className="img w-1/2 h-full shrink-0 overflow-hidden rounded-xl">
            <img
              className="size-full object-center"
              src={
                poster_path
                  ? POSTER_URL + poster_path
                  : POSTER_URL + poster_path
              }
            />
          </div>

          <div className=" details grow py-4 px-6 flex flex-col gap-2">
            <div className="moveInfo grow   ">
              <p className="title font-bold text-white text-4xl text-balance mb-2  w-full ">
                {title ? title : "Title Not Available"}
              </p>
              <p className=" overview text-gray-400 text-lg/6 text-balance mt-2 font-bold  min-w-0  h-full overflow-hidden whitespace-pre-wrap  grow text-left ">
                {overview ? overview.split(" ").splice(0, 60).join(" ") : "Overview Not Available"}
              </p>
            </div>
            <div className="action-list mt-auto flex flex-col gap-3 w-full">
              <NavLink
                to={`/PlayingTrailer/${title}/${id}`}
                onClick={HandleFavorite}
                disabled={isClicked}
                className="button focus:outline-none flex  bg-slate-950 shadow-[inset_0px_2px_0.5px_0px_rgba(255,255,255,0.4)] items-center justify-center gap-1 text-lg py-3
              text-white font-bold rounded-md"
              >
                <IconPlayerPlayFilled
                  size={20}
                  color="white"
                  strokeWidth={3}
                  className="inline-block"
                />
                Play
              </NavLink>

              <button
                onClick={HandleFavorite}
                disabled={isClicked}
                className="button focus:outline-none flex  bg-slate-950 shadow-[inset_0px_2px_0.5px_0px_rgba(255,255,255,0.4)] items-center justify-center gap-1 text-lg py-3
              text-white font-bold rounded-md"
              >
                <IconHeartFilled
                  size={20}
                  color="white"
                  strokeWidth={3}
                  className="inline-block"
                />
                Favorite
              </button>

              <button
                onClick={HandleWatchLater}
                disabled={isClicked}
                className="button focus:outline-none flex  bg-slate-950 shadow-[inset_0px_2px_0.5px_0px_rgba(255,255,255,0.4)] items-center justify-center gap-1 text-lg py-3
              text-white font-bold rounded-md"
              >
                <IconPlus
                  size={20}
                  color="white"
                  strokeWidth={3}
                  className="inline-block"
                />
                My list
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopOver;
