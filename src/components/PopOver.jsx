/* eslint-disable react/prop-types */

import React, { useState } from "react";
import { POSTER_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteMovies, addWatchLaterMovies } from "../utils/savedSlice";
import { Link } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../utils/firebase";
import gsap from "gsap";
import Recommendations from "./Recommendations";
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
      <div className="popMain flex h-[330px] w-[390px] flex-col overflow-hidden rounded-xl">
        <div className="img flex-1 overflow-hidden">
          <img
            className=" "
            src={
              backdrop_path
                ? POSTER_URL + backdrop_path
                : POSTER_URL + poster_path
            }
          />
        </div>

        <div className=" details flex-1 bg-glass p-4 flex flex-col gap-2">
          <div className="action-list flex justify-evenly items-stretch gap-2 w-ful">
            <div
              className="button flex-1  bg-[#b91c1cfe] backdrop-blur-2xl text-center text-xl py-3
               text-white font-bold rounded-md"
            >
              <Link className="" to={`/PlayingTrailer/${title}/${id}`}>
                {" "}
                <i className="fa-solid fa-play"></i>
              </Link>{" "}
            </div>

            <div
              onClick={HandleRec}
              className="button flex-1 bg-[#b91c1cfe] backdrop-blur-2xl text-center text-xl py-3 text-white font-bold rounded-md"
            >
              <i className="fa-solid fa-clone rec"></i>
            </div>
            <div
              onClick={HandleFavorite}
              disabled={isClicked}
              className="ag button  flex-1 bg-[#b91c1cfe] backdrop-blur-2xl  text-center text-xl py-3 text-white font-bold rounded-md"
            >
              {/* onMouseOver={HandleHover("\".ag\"")} */}
              <i className="fa-solid fa-heart  hover:animate-spin anima"></i>
            </div>
            <div
              onClick={HandleWatchLater}
              disabled={isClicked}
              className="button flex-1 bg-[#b91c1cfe] backdrop-blur-2xl  text-center text-xl py-3 text-white font-bold rounded-md"
            >
              <i className="fa-solid fa-plus"></i>
            </div>
          </div>
          <div className="moveInfo flex h-full flex-col  text-white gap-2 w-full overflow-hidden">
            <p className="title font-bold text-lg  h-fit w-full ">
              {title ? title : "Title Not Available"}
            </p>
            <p className=" overview text-white text-sm min-w-0  h-full overflow-hidden whitespace-pre-wrap  line-clamp-2 grow text-left ">
              {overview ? overview : "Overview Not Available"}
            </p>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default PopOver;
