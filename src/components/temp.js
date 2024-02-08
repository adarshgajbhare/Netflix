/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { POSTER_URL } from "../utils/constant";
// import PopOver from "./PopOver";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import PlayTrailer from "./PlayTrailer";
import { Link } from "react-router-dom";
// import { createYoutube } from "../utils/trailerSlice";
// import { useDispatch } from "react-redux";
// import useTrailerPage from "../hooks/useTrailerPage";
import { FaArrowLeft } from "react-icons/fa6";
const ShowCard = ({ title, movies }) => {
  const [, setTrailerPage] = useState(false);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
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

  //
  const HandlePosterTrailer = (movie) => {
    setTrailerPage(true);
    console.log(movie.name);
  };

  return (
    <>
   

      <div
        className={` transition-all duration-300 ease-in-out box-slider relative   flex overflow-visible min-h-64  w-full  gap-2 whitespace-nowrap z-0`}
      >
        {/* <Slider {...settings} className="your-slider-container "> */}

        {movies &&
          movies.map((movie) => (
            <div className="card  flex max-h-64 max-w-48 relative z-10   cursor-pointer flex-shrink-0  ">
              <Link
                to={`/PlayingTrailer/${movie.name ? movie.name : movie.title}/${
                  movie.id
                }`}
              >
                <img
                  onClick={() => {
                    HandlePosterTrailer(movie);
                  }}
                  className="h-full w-full object-cover object-center gap-5 hover:scale-125 hover:duration-700 ease-in-out hover:cursor-pointer 
                        z-50 border"
                  key={movie.id}
                  src={POSTER_URL + movie.poster_path}
                />
              </Link>

              {/* <div className="absolute z-50 -top-96 left-0 ">
                        <PopOver />
                      </div> */}
            </div>
          ))}
        {/* </Slider> */}
      </div>
    </>
  );
};

export default ShowCard;
