/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import NavbarBottom from "./NavbarBottom";

const SecondaryContainer = ({ series }) => {
  const movies = useSelector((store) => store?.movies);

  if (!movies) return null;

  return (
    <div className="">
      <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies} />{" "}
      <MovieList title={"Popular Movies"} movies={movies?.popularMovies} />{" "}
      <MovieList title={"Top Movies"} movies={movies?.topMovies} />
      <MovieList title={"Upcoming Movies"} movies={movies?.upcomingMovies} />
      <div className="h-20"></div>
      <div className="lg:hidden 2xl:hidden">
        <NavbarBottom />
      </div>
    </div>
  );
};

export default SecondaryContainer;
