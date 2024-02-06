/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { removeUser } from "../utils/userSlice";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopMovies from "../hooks/useTopMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import { useState } from "react";
import { Link } from "react-router-dom";
import TopSmallNav from "./TopSmallNav";

const Browse = () => {
  const { movieCards, setMoovieCards } = useState(false);
  console.log(movieCards);
  const dispatch = useDispatch();
  const video = useSelector((store) => store?.movies?.trailerVideo);
  const [isVolume, setIsVolume] = useState(false);
  console.log(video);
  useNowPlayingMovies();
  usePopularMovies();
  useTopMovies();
  useUpcomingMovies();

  const movies = useSelector((store) => store?.movies?.nowPlayingMovies);
  const allMovies = useSelector((store) => store?.movies);

  if (!allMovies) return null;
  if (!movies) return;

  const mainMovie = movies[1];
  const { original_title, title, overview, id, poster_path } = mainMovie;

  const HandleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
      })
      .catch((error) => {});
  };
  const HandleVolume = () => {
    setIsVolume(!isVolume);
  };

  const moviesYoutube = `https://www.youtube.com/embed/${
    video?.key
  }?rel=0&modestbranding=1&autohide=1&autoplay=1&showinfo=0&controls=0&loop=1&modestbranding=1&fs=0&cc_load_policy=0&iv_load_policy=0&autohide=0&mute=${
    isVolume ? "" : 1
  }`;
  return (
    <div className="main-container relative w-full min-h-full overflow-x-hidden">
      <div className="absolute inset-0 -z-10   [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <div className="absolute h-[100vh] w-full  -z-10  inset-0  ">
        <iframe
          className="hidden 2xl:block lg:block h-full w-full object-cover scale-150 bg-gradient-to-t from-black"
          src={moviesYoutube}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
      <div className="mobile 2xl:hidden lg:hidden">
        <div className="navbar z-50 bg-glass fixed w-full text-center flex justify-between items-center p-2">
          <div className="">
            <Header />
          </div>
          <i
            onClick={HandleSignOut}
            className="fa-solid fa-power-off text-white text-3xl pr-2"
          ></i>
        </div>
      </div>
    <TopSmallNav/>      
      <MainContainer
        original_title={original_title}
        tittle={title}
        overview={overview}
        id={id}
        poster_path={poster_path}
      />
      {console.log("before Sending", movieCards)}
      <SecondaryContainer isSeries={movieCards} allMovies={allMovies} />
      <div
        className="hidden 2xl:block lg:block absolute w-[500px] h-[450px] top-56 left-[55px]  gap-4 rounded-md    
        flex-col   z-[999]"
      >
        <div className="  font-bold tracking-tighter child title text-5xl overflow-hidden text-white relative p-4">
          {/* <div className=" overlay inset-0 bg-black opacity-10 h-full w-full absolute -z-10 "> </div> */}
          {title ? title : original_title}
        </div>

        <div className="   child plot overflow-hidden  text-white relative p-4">
          {/* <div className="overlay inset-0 bg-black opacity-50 h-full w-full absolute -z-10"> </div> */}
          {overview}
        </div>

        <div className=" gap-4  flex items-center overflow-hidden bg-transparent px-4">
          <div className="grow ">
            <button className="bg-hotstar font-bold text-md rounded-md  text-white bg-transparent  items-center justify-center  py-4 w-full">
              <i className="fa-solid fa-play mr-2 text-xl hover:text-5xl"></i>{" "}
              <span> Watch Now </span>
            </button>
          </div>
          <div className="hover:cursor-pointer flex justify-around">
            <button className="bg-hotstar    font-bold text-md rounded-md  bg-transparent text-white flex-none items-stretch px-6 py-4">
              <i className="fa-solid fa-plus text-xl"></i>
            </button>
          </div>
          <div className="hover:cursor-pointer ">
            <button
              onClick={HandleVolume}
              className=" bg-hotstar font-bold text-md rounded-md  bg-transparent text-white flex-none items-stretch px-6 py-4"
            >
              {isVolume ? (
                <i className="fa-solid fa-volume-high 2xl"></i>
              ) : (
                <i className="fa-solid fa-volume-xmark 2xl"></i>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Browse;
