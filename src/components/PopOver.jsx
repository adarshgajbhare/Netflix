/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { POSTER_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addFavoriteMovies, addWatchLaterMovies } from "../utils/savedSlice";

const PopOver = ({
  movie,
  id,
  poster_path,
  title,
  overview,
  backdrop_path,
}) => {
  const dispatch = useDispatch();

  const HandleWatchLater = () => {
    dispatch(addWatchLaterMovies(movie));
  };
  const HandleFavorite = () => {
    dispatch(addFavoriteMovies(movie));
  };

  return (
    <>
      <div className="card  flex h-[330px] w-[390px] flex-col overflow-hidden rounded-xl ">
        <div className="img flex-1 overflow-hidden">
          <img className=" " src={POSTER_URL + backdrop_path} />
        </div>

        <div className="  details flex-1 bg-glass p-4 flex flex-col gap-2">
          <div className="buttons flex w-full items-stretch gap-2">
            <button className="w-full grow rounded-md bg-white py-3 text-sm font-bold">
              Watch Now
            </button>
            <button
              onClick={HandleWatchLater}
              className="rounded-md bg-white px-4 py-2 text-3xl font-semibold flex justify-center items-center"
            >
              <p className="h-fit w-fit ">+</p>
            </button>
            <button
              onClick={HandleFavorite}
              className="rounded-md bg-white px-4 py-2 text-3xl font-semibold flex justify-center items-center"
            >
              <i className="fa-regular fa-heart text-red-500 "></i>
            </button>
          </div>

          <div className="moveInfo flex h-full flex-col  text-white gap-2 w-full overflow-hidden">
            <p className="title font-bold text-lg  h-fit w-full ">{title}</p>
            <p className=" overview text-[#7f87a4] text-sm min-w-0  h-full overflow-hidden whitespace-pre-wrap  line-clamp-2 grow text-left ">
              {overview}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopOver;
