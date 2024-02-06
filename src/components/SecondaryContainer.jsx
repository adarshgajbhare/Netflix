/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import MovieList from "./MovieList";
import NavbarBottom from "./NavbarBottom";

const  SecondaryContainer = ({ isSeries , allMovies }) => {

  return (
    <> 
   {isSeries ?
   <div className="">
      <MovieList title={"Popular Shows"} movies={allMovies?.popularShow} />{" "}
      <MovieList title={"Top Rated"} movies={allMovies?.topShows} />{" "}
      <MovieList title={"Upcoming Shows"} movies={allMovies?.onAirShow} />
      <MovieList title={"On Air Shows "} movies={allMovies?.arrivingTodayShow} />
      
      <div className="h-20"></div>
      <div className="lg:hidden 2xl:hidden">
        <NavbarBottom />
      </div>
    </div>
    :<div className="">
      <MovieList title={"Now Playing"} movies={allMovies?.nowPlayingMovies} />{" "}
      <MovieList title={"Popular Movies"} movies={allMovies?.popularMovies} />{" "}
      <MovieList title={"Top Movies"} movies={allMovies?.topMovies} />
      <MovieList title={"Upcoming Movies"} movies={allMovies?.upcomingMovies} />
      <div className="h-20"></div>
      <div className="lg:hidden 2xl:hidden">
        <NavbarBottom />
      </div>
    </div>}
    </>
  );
};

export default SecondaryContainer;
