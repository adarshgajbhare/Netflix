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
    setHoveredId(id);
    setIsClick(!isClick);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  // var settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 6,
  //   slidesToScroll: 2,
  //   initialSlide: 2,
  //   prevArrow: <Arrow2 />,
  //   nextArrow: <Arrow />,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 4,
  //         slidesToScroll: 3,
  //         infinite: true,
  //         dots: true,
  //       },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2,
  //         initialSlide: 2,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //       },
  //     },
  //   ],
  // };
  // function Arrow(props) {
  //   const { className, style, onClick } = props;
  //   return (
  //     <div
  //       className={className}
  //       style={{
  //         ...style,
  //         overflow: "visible",
  //         marginTop: "60px",
  //         marginRight: "35px",
  //         scale: "2",
  //         zIndex: 999,
  //         paddingTop: "3rem",
  //         paddingBottom: "3.5rem",
  //         textAlign: "center",
  //         height: "fit-content",
  //         width: "fit-content",
  //         color: "red",
  //         background: "bg-glass",
  //         opacity: "0.5",
  //         borderBottomLeftRadius: "0.5rem",
  //         borderTopLeftRadius: "0.5rem",
  //       }}
  //       onClick={onClick}
  //     />
  //   );
  // }

  // function Arrow2(props) {
  //   const { className, style, onClick } = props;
  //   return (
  //     <div
  //       className={className}
  //       style={{
  //         ...style,
  //         overflow: "visible",
  //         marginTop: "60px",
  //         marginLeft: "35px",
  //         scale: "2",
  //         zIndex: 999,
  //         paddingTop: "3rem",
  //         paddingBottom: "3.5rem",
  //         textAlign: "center",
  //         height: "fit-content",
  //         width: "fit-content",
  //         color: "red",

  //         opacity: "0.5",
  //         borderBottomRightRadius: "0.5rem",
  //         borderTopRightRadius: "0.5rem",
  //       }}
  //       onClick={onClick}
  //     />
  //   );
  // }

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
