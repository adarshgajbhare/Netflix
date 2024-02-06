  // /* eslint-disable react/prop-types */
  // /* eslint-disable no-unused-vars */
  // import { useSelector } from "react-redux";
  // import MovieList from "./MovieList";
  // import NavbarBottom from "./NavbarBottom";

  // import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";





  // import { Swiper, SwiperSlide } from "swiper/react";

  // // Import Swiper styles
  // import "swiper/css";
  // import "swiper/css/navigation";
  // import "swiper/css/pagination";
  // import "swiper/css/scrollbar";

  // const SecondaryContainer = ({ series }) => {
  //   const movies = useSelector((store) => store?.movies);

  //   if (!movies) return null;

  //   return (
  //     <div className="">
  //       <Swiper
  //         modules={[Navigation, Pagination, Scrollbar, A11y]}
  //         spaceBetween={-7200}
  //         slidesPerView={3}
  //         speed={100000}
  //         navigation
  //         pagination={{ clickable: true }}
  //         keyboard={true}
  //         mousewheel={true}
  //         scrollbar={{ draggable: true }}
  //       >
  //         <SwiperSlide>
  //           <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies} />{" "}
  //         </SwiperSlide>{" "}
  //       </Swiper>
  //       <MovieList title={"Popular Movies"} movies={movies?.popularMovies} />{" "}
  //       <MovieList title={"Top Movies"} movies={movies?.topMovies} />
  //       <MovieList title={"Upcoming Movies"} movies={movies?.upcomingMovies} />
  //       <div className="h-20"></div>
  //       <div className="lg:hidden 2xl:hidden">
  //         <NavbarBottom />
  //       </div>
  //     </div>
  //   );
  // };

  // export default SecondaryContainer;