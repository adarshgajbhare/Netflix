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

  

  const youtubeEmbedUrl = `https://www.youtube.com/embed/${video?.key}?rel=0&modestbranding=1&autohide=1&autoplay=1&showinfo=0&controls=0&loop=1&modestbranding=1&fs=0&cc_load_policy=0&iv_load_policy=0&autohide=0&mute=100`;


  src=`https://www.youtube.com/embed/${video?.key};controls=0&mute=00&autoplay=1` title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen