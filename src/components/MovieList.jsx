/* eslint-disable react/prop-types */

import "swiper/css";
import MoviesCard from "./MoviesCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="flex flex-col mb-5 gap-4 shrink-0 pl-4 ">
      <h1 className="text-white font-semibold text-2xl">{title}</h1>
      <div
        className="flex gap-10 shadow-[0px_-80px_1500px_1000px_#00000] justify-start overflow-x-scroll overflow-y-hidden 2xl:overflow-y-hidden lg:overflow-y-hidden
       snap-x snap-mandatory 2xl:overflow-scroll lg:overflow-scroll" >
        {movies &&
          movies.map((movie) => (
            <MoviesCard key={movie.id} poster_path={movie.poster_path} />
          ))}
      </div>
    </div>
  );
};

export default MovieList;
