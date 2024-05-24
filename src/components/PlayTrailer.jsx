/* eslint-disable react/prop-types */
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useShowYT from "../hooks/useShowYT";
import useMovieYT from "../hooks/useMovieYT";
import Navbar from "./Navbar";
import useRecommendation from "../hooks/useRecommendation";
import ShowCard from "./ShowCard";







const PlayTrailer = () => {
  const { name, id } = useParams();
  const recData = useSelector((store) => store.movies);
  const recSeries = useSelector((store) => store.movies);
  useMovieYT({ id });
  useShowYT({ id });
  useRecommendation({ id });
  const seriesTrailer = useSelector((store) => store?.trailers?.bigShowTrailer);
  const video = useSelector((store) => store?.trailers?.bigMovieTrailer);

  const tvTrailer = `https://www.youtube.com/embed/${seriesTrailer?.key}?rel=0&modestbranding=1&autohide=1&autoplay=1&showinfo=0&controls=1&loop=1&modestbranding=1&fs=0&cc_load_policy=0&iv_load_policy=0&autohide=0`;

  const moviesYoutube = `https://www.youtube.com/embed/${video?.key}?rel=0&modestbranding=1&autoplay=1&showinfo=0&controls=1&loop=1&modestbranding=1&fs=0&cc_load_policy=0&iv_load_policy=0&autohide=1&mute=1&playsinline=1&enablejsapi=1`;

  let showResult = tvTrailer.includes("undefined");

  let movieResult = moviesYoutube.includes("undefined");

  if (movieResult && showResult) return;

  return (
    <>
      <div className="min-h-dvh bg-black relative overflow-x-hidden">
        <div className="h-20 ">
          <Navbar />
        </div>
        <h1 className="text-white font-bold text-3xl mb-3 ml-6">
   Trailer
      </h1>
        <div className="lg:h-screen md:h-screen xl:h-screen 2xl:h-screen h-[40vh] w-full  mx-auto">
          <iframe
            className="2xl:block lg:block h-full aspect-video w-full object-cover bg-gradient-to-t from-black"
            src={!movieResult ? moviesYoutube : tvTrailer}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowFullScreen
          ></iframe>
        </div>
        <div className="recommendations py-16">
          {recData &&
            recData.addRecommendations &&
            recData.addRecommendations.length > 0 ? (
            <ShowCard
              title="Your Recommedations"
              movies={recData.addRecommendations}
            />
          ) : (
            ""
          )}
          {recSeries &&
            recSeries.seriesJson &&
            recSeries.seriesJson.length > 0 ? (
            <ShowCard
              title="Your recommedations"
              movies={recSeries.seriesJson}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default PlayTrailer;
