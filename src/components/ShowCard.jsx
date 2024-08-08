/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

import React, { useState } from "react";
import { POSTER_URL } from "../utils/constant";
import PopOver from "./PopOver";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const ShowCard = ({ title, movies }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const [isClick, setIsClick] = useState(false);

  const handleMouseEnter = (id) => {
    setHoveredId(id);
    setIsClick(!isClick);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };
  console.log(movies, "fkdfkdkfdjkfjkaj");
  return (
    <>
      <h1 className="text-white font-bold text-3xl mt-3  ml-6">{title}</h1>

      <div className=" w-full whitespace-nowrap overflow-x-scroll pl-6 pb-8 flex flex-nowrap ">
        {movies &&
          movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleMouseEnter(movie.id)}
              className="card relative h-[350px] min-w-60 mr-5 rounded-md overflow-hidden"
            >
              <img
                alt={`Image ${movie.id}`}
                className={`  h-full w-full  object-cover object-center  `}
                key={movie.id}
                src={POSTER_URL + movie.poster_path}
              />
              {/* </Link> */}
              {hoveredId === movie.id && hoveredId !== null && isClick ? (
                <PopOver
                  movie={movie}
                  id={hoveredId}
                  poster_path={movie.poster_path}
                  title={movie.title ? movie.title : movie.name}
                  overview={movie.overview}
                  backdrop_path={movie.backdrop_path}
                  release_date ={movie.release_date}
                  vote_average ={movie.vote_average}
                />
              ) : (
                ""
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default ShowCard;
