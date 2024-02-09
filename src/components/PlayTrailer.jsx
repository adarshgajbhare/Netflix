/* eslint-disable react/prop-types */
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useShowYT from "../hooks/useShowYT";
import useMovieYT from "../hooks/useMovieYT";
const PlayTrailer = () => {
  const { name, id } = useParams();

  useMovieYT({ id });
  useShowYT({ id });

  console.log(id);

  const seriesTrailer = useSelector((store) => store?.trailers?.bigShowTrailer);
  const video = useSelector((store) => store?.trailers?.bigMovieTrailer);

  const tvTrailer = `https://www.youtube.com/embed/${seriesTrailer?.key}?rel=0&modestbranding=1&autohide=1&autoplay=1&showinfo=0&controls=1&loop=1&modestbranding=1&fs=0&cc_load_policy=0&iv_load_policy=0&autohide=0`;

  const moviesYoutube = `https://www.youtube.com/embed/${video?.key}?rel=0&modestbranding=1&autoplay=1&showinfo=0&controls=1&loop=1&modestbranding=1&fs=0&cc_load_policy=0&iv_load_policy=0&autohide=1&mute=1&playsinline=1&enablejsapi=1`;

  

  let showResult = tvTrailer.includes("undefined");


  let movieResult = moviesYoutube.includes("undefined");


  if(movieResult && showResult) return;

  return (
    <>
      <div className="h-full w-full  bg-red-500">
        <h1>{name} is here</h1>
        <h1>{id} is here</h1>{" "}
      </div>
      <div className=" h-[80vh] w-[80vw]  -z-10  inset-0  ">
        <iframe
          className="2xl:block lg:block h-full w-full object-cover  bg-gradient-to-t from-black"
          src={!movieResult ? moviesYoutube : tvTrailer}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
    </>
  );
};

export default PlayTrailer;
