/* eslint-disable react/prop-types */

import MoviesCard from "./MoviesCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="flex flex-col mb-5 gap-4 shrink-0 pl-4">
      <h1 className="text-white font-semibold text-2xl">{title}</h1>
      <div
        className="flex gap-3 2xl:overflow-visible  lg:overflow-visible justify-start overflow-x-scroll snap-x snap-mandatory
      "
      >
        
        {movies &&
          movies.map((movie) => (
       
            <MoviesCard key={movie.id} poster_path={movie.poster_path} />
          ))}{" "}
      </div>
    </div>
  );
};

export default MovieList;
