/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import NavbarBottom from "./NavbarBottom";
const SecondaryContainer = ({series}) => {
  const movies = useSelector((store) => store?.movies);
  const shows = useSelector((store) => store?.shows);
  if (!movies) return;
  //console.log(movies);

  return (
    <div className="">
      <MovieList
        title={"Now Playing Movies"}
        movies={movies?.nowPlayingMovies}
      />
      <MovieList title={"Popular Movies"} movies={movies?.popularMovies} />
      <MovieList title={"Top Movies"} movies={movies?.topMovies} />
      <MovieList title={"Upcoming Movies"} movies={movies?.upcomingMovies} />
      <div className="h-20"></div>
      <div className="lg:hidden">
        <NavbarBottom />{" "}
      </div>
    </div>
  );
};

export default SecondaryContainer;
