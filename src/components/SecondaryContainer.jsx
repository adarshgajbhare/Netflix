/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import NavbarBottom from "./NavbarBottom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const SecondaryContainer = ({ series }) => {
  const movies = useSelector((store) => store?.movies);

  if (!movies) return null;

  return (
    <div className=" ">
      <Swiper
        spaceBetween={1}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
         
          <MovieList
            title={"Now Playing Movies"}
            movies={movies?.nowPlayingMovies}
          />
        </SwiperSlide>
      </Swiper>
      <MovieList title={"Popular Movies"} movies={movies?.popularMovies} />

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
