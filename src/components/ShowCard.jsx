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
  // const [, setTrailerPage] = useState(false);

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

  // const HandlePosterTrailer = (movie) => {
  //   setTrailerPage(true);
  //   console.log(movie.name);
  // };
  const [newCard, setNewCard] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredId(id);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };
  const HandleNewCard = () => {
    setNewCard(true);
    console.log("Hoverefdkfdfldlfdklfd")
  };

  return (
    <>
      <h1 className="text-white font-semibold text-2xl my-4"> {title}</h1>

      <div
        className={` transition-all duration-300 ease-in-out box-slider relative   overflow-visible min-h-64  w-full 
         gap-2 whitespace-nowrap z-0`}
      >
        {hoveredId && <p className="text-white border-4 border-red-700 z-50">Hovered ID: {hoveredId}</p>}
        <Slider {...settings} className="your-slider-container ">
          {movies &&
            movies.map((movie) => (
              <div className="card  flex max-h-64 max-w-48 relative z-10   cursor-pointer flex-shrink-0  ">
                <Link
                  to={`/PlayingTrailer/${
                    movie.name ? movie.name : movie.title
                  }/${movie.id}`}>
                  <img
                   
                     alt={`Image ${movie.id}`}
                     onMouseEnter={() => handleMouseEnter(movie.id)}
                     onMouseLeave={handleMouseLeave}
                    className={` card-${movie.id}  h-full w-full object-cover object-center gap-5 hover:cursor-pointer z-50 border`}
                    key={movie.id}
                    src={POSTER_URL + movie.poster_path}
                  />
                
                </Link>
              </div>
            ))}
        </Slider>
      </div>
    </>
  );
};

export default ShowCard;
 {/* <div className="absolute z-50 -top-96 left-0  flex gap-4">
            <PopOver />
          </div> */}