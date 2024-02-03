import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import NavbarBottom from "./NavbarBottom";
const SecondaryContainer = () => {
  const movies = useSelector((store) => store?.movies);
  if (!movies) return;
  console.log(movies);
  return (
    <div>
      <MovieList
        title={"Now Playing Movies"}
        movies={movies?.nowPlayingMovies}
      />
      <MovieList
        title={"Now Playing Movies"}
        movies={movies?.nowPlayingMovies}
      />
      <MovieList
        title={"Now Playing Movies"}
        movies={movies?.nowPlayingMovies}
      />
      <MovieList
        title={"Now Playing Movies"}
        movies={movies?.nowPlayingMovies}
      />
      <div className="lg:hidden"><NavbarBottom /> </div>
      
    </div>
  );
};

export default SecondaryContainer;
