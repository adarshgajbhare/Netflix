/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

import React, { useState } from "react";
import { POSTER_URL } from "../utils/constant";
import PopOver from "./PopOver";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import gsap from "gsap";
import { Link } from "react-router-dom";

const ShowCard = ({ title, movies }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const [isClick, setIsClick] = useState(false);

  const handleMouseEnter = (id) => {
    // gsap.from(".PopOver-card", {
    //   duration:0.2,
    //    scale:0.5,

    // })
    setHoveredId(id);
    setIsClick(!isClick);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    initialSlide: 2,
    prevArrow: <Arrow2 />,
    nextArrow: <Arrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
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
          background: "bg-glass",
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
      <h1 className="text-white font-semibold text-2xl mt-10 mb-4"> {title}</h1>

      <div
        className="mainBox transition-all duration-300 ease-in-out box-slider relative overflow-visible min-h-64  w-full 
         gap-2 whitespace-nowrap z-0"
      >
        <Slider {...settings}>
          {movies &&
            movies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => handleMouseEnter(movie.id)}
                className="card flex max-h-64 max-w-48 relative cursor-pointer flex-shrink-0   transition-all duration-300 ease-in-out"
              >
                {/* <Link
                  to={`/PlayingTrailer/${
                    movie.name ? movie.name : movie.title
                  }/${movie.id}`}
                > */}
                <img
                  alt={`Image ${movie.id}`}
                  className={`  h-full w-full object-cover object-center border `}
                  key={movie.id}
                  src={POSTER_URL + movie.poster_path}
                />
                {/* </Link> */}
                {hoveredId === movie.id && hoveredId !== null && isClick ? (
                  <div className=" absolute -top-[10%] scale-105  z-[999] left-[50%] -translate-x-[50%] transition-opacity duration-300 opacity-100 shadow-2xl">
                    <PopOver
                      movie={movie}
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
