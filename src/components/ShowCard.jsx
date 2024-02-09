/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

import React, { useState } from "react";
import { POSTER_URL } from "../utils/constant";
import PopOver from "./PopOver";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Link } from "react-router-dom";

const ShowCard = ({ title, movies }) => {

  const [hoveredId, setHoveredId] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredId(id);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };
  

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7.5,
    slidesToScroll: 2,
    initialSlide: 0,
    prevArrow: <Arrow2 />,
    nextArrow: <Arrow />,
  };
  function Arrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          overflow: "visible",
          marginTop: "60px",
          marginRight: "35px",
          scale: "2",
          zIndex: 999,
          paddingTop: "3rem",
          paddingBottom: "3.5rem",
          textAlign: "center",
          height: "fit-content",
          width: "fit-content",
          color: "red",
          background: "black",
          opacity: "0.5",
          borderBottomLeftRadius: "0.5rem",
          borderTopLeftRadius: "0.5rem",
        }}
        onClick={onClick}
      />
    );
  }

  function Arrow2(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          overflow: "visible",
          marginTop: "60px",
          marginLeft: "35px",
          scale: "2",
          zIndex: 999,
          paddingTop: "3rem",
          paddingBottom: "3.5rem",
          textAlign: "center",
          height: "fit-content",
          width: "fit-content",
          color: "red",
          background: "black",

          opacity: "0.5",
          borderBottomRightRadius: "0.5rem",
          borderTopRightRadius: "0.5rem",
        }}
        onClick={onClick}
      />
    );
  }

 
  return (
    <>
      <h1 className="text-white font-semibold text-2xl mt-16 mb-4"> {title}</h1>
      <div
        className="mainBox transition-all duration-300 ease-in-out box-slider relative   overflow-visible min-h-64  w-full 
         gap-2 whitespace-nowrap z-0"
      >
        <Slider {...settings} >
          {movies &&
            movies.map((movie) => (
              <div
              key={movie.id}
                onMouseEnter={() => handleMouseEnter(movie.id)}
                onMouseLeave={handleMouseLeave}
                className="card  flex max-h-64 max-w-48 relative cursor-pointer flex-shrink-0  
              transition-all duration-300 ease-in-out"
              >
                <Link
                  to={`/PlayingTrailer/${
                    movie.name ? movie.name : movie.title
                  }/${movie.id}`}
                >
                  <img
                    alt={`Image ${movie.id}`}
                    className={`  h-full w-full object-cover object-center border `}
                    key={movie.id}
                    src={POSTER_URL + movie.poster_path}
                  />
                </Link>
                {hoveredId === movie.id && hoveredId !== null ? (
                  <div
                    className="absolute -top-[10%] scale-105  z-[999] left-[50%] -translate-x-[50%] transition-opacity duration-300 opacity-100 shadow-2xl"
                  >
                    <PopOver
                    movie ={movie}
                      id={hoveredId}
                      poster_path={movie.poster_path}
                      title={movie.title ? movie.title : movie.name}
                      overview={movie.overview}
                      backdrop_path={movie.backdrop_path}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
        </Slider>
      </div>
    </>
  );
};

export default ShowCard;
{
  /* <div className="absolute z-50 -top-96 left-0  flex gap-4">
            <PopOver />
          </div> */
}

{
  /* <div className={` ${hoveredId === movie.id && hoveredId !== null ? "details flex-1 bg-[#16181f] p-4 flex flex-col gap-2"  : "details flex-1 bg-[#16181f] p-4 hidden flex-col gap-2"} `}>
                    <div className="buttons flex w-full items-stretch gap-2">
                      <button className="w-full grow rounded-md bg-white py-3 text-sm font-bold">
                        Watch Now
                      </button>
                      <button className="rounded-md bg-white px-4 py-2 text-3xl font-semibold flex justify-center items-center">
                        {" "}
                        <p className="h-fit w-fit ">+</p>
                      </button>
                    </div>
                    <div className="moveInfo flex h-full flex-col  text-white gap-2">
                      <p className="title font-bold text-lg  ">{movie.title || movie.name}</p>
                      <p className=" overview text-[#7f87a4] text-sm  line-clamp-3 overflow-hidden w-full grow text-left pr-3">
                        {movie.overview}
                      </p>
                    </div>
                  </div> */
}
