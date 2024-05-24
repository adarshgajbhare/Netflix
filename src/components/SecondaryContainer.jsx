/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import NavbarBottom from "./NavbarBottom";
import ShowCard from "./ShowCard";


const SecondaryContainer = ({ isSeries, allMovies }) => {
  
  return (
    <>
      {isSeries ? (
        <div className="">
        
          <ShowCard  title={"Top Rated"} movies={allMovies?.topShows} />{" "}
          <ShowCard title={"Popular Shows"} movies={allMovies?.popularShow} />{" "}
        
          <ShowCard title={"Upcoming Shows"} movies={allMovies?.onAirShow} />
          <ShowCard
            title={"On Air Shows "}
            movies={allMovies?.arrivingTodayShow}
          />
          <div className="lg:hidden 2xl:hidden">
            <NavbarBottom />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 bg-black relative ">
          <ShowCard
            title={"Now Playing"}
            movies={allMovies?.nowPlayingMovies}
          />{" "}
           <ShowCard
            title={"Upcoming Movies"}
            movies={allMovies?.upcomingMovies}
          />
          <ShowCard
            title={"Popular Movies"}
            movies={allMovies?.popularMovies}
          />{" "}
          <ShowCard title={"Top Movies"} movies={allMovies?.topMovies} />
         
          <div className="h-20"></div>
          <div className="lg:hidden 2xl:hidden">
            <NavbarBottom />
          </div>
        </div>
      )}
    </>
  );
};

export default SecondaryContainer;
