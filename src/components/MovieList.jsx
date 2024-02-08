/* eslint-disable react/prop-types */
import React from "react";
import "swiper/css";
import MoviesCard from "./MoviesCard";
   
const MovieList = ({ title, movies }) => {
  return ( 
   <> 
  <h1 className="text-white font-semibold text-2xl my-8">{title}</h1>
    {/* <div className="flex flex-col mb-5 gap-4 shrink-0 pl-4 border-4 border-yellow-600  "> */}
      <div
        className="flex gap-10 shadow-[0px_-80px_1500px_1000px_#00000] justify-start overflow-x-scroll 
       snap-x snap-mandatory 2xl:overflow-scroll lg:overflow-scroll border-4 border-red-600 " >
        {movies &&
          movies.map((movie) => (
            <MoviesCard key={movie.id} poster_path={movie.poster_path} />
          ))}
      {/* </div> */}
    </div>
     </>  
  );
};

export default MovieList;
