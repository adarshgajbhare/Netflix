/* eslint-disable no-unused-vars */
import { POSTER_URL, SERIES_POSTER_URL } from "../utils/constant";
import { Link } from "react-router-dom";
import Tilt from "react-vanilla-tilt";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { removeUser } from "../utils/userSlice";
import { useState } from "react";
import useShowTrailer from "../hooks/useShowTrailer";
import React from "react";
import Navbar from "./Navbar";

// eslint-disable-next-line react/prop-types
const MainPoster = ({ title, poster_path, original_title, id }) => {
  const user = useSelector((store) => store?.user);
  const [isSeries, setIsSeries] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const video = useSelector((store) => store?.movies?.trailerVideo);
  const dispatch = useDispatch();

  useMovieTrailer({ id });
  useShowTrailer({ id });

  const HandleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
      })
      .catch((error) => {});
  };

  const HandleTvShows = () => {
    setIsSeries(!isSeries);
  };

  return (
    <div className="p-5">
      <Tilt
        options={{
          scale: 1,
          glare: true,
          "max-glare": 0.5,
          "glare-prerender": true,
        }}
        style={{}}
      >
        <div className="mainPoster mobile 2xl:hidden lg:hidden">
          <div className="img-container  relative rounded-xl overflow-hidden md:scale-75">
            <div className="absolute inset-0  bg-gradient-to-t  opacity-75 from-black"></div>

            <div className="text-black  p-4 gap-2 flex items-center  absolute bottom-0 w-full md:p-8 md:gap-5">
              <div className=" flex-1 w-full ">
                <button className=" font-bold text-md rounded-sm btn px-3 py-2 w-full play  text-[#131313] bg-white md:px-10 md:py-8 md:text-3xl">
                  <i className="fa-solid fa-play mr-2 text-xl md:text-3xl"></i>{" "}
                  Play
                </button>
              </div>
              <div className="flex-1 w-full ">
                <button className="hover:bg-glass font-bold text-md rounded-sm btn px-3 py-2 w-full  my-list bg-[#131313] text-white md:px-10 md:py-8 md:text-3xl">
                  <i className="fa-solid fa-plus mr-2 text-xl md:text-3xl"></i>{" "}
                  My List
                </button>
              </div>
            </div>
            {isSeries ? (
              <img
                className="h-full w-full "
                src={SERIES_POSTER_URL + poster_path}
              />
            ) : (
              <img className="h-full w-full " src={POSTER_URL + poster_path} />
            )}
          </div>{" "}
        </div>
      </Tilt>
      <div className="">
       
        <Navbar />
      </div>
      {/* <div className="laptop-ipad-big-laptop hidden 2xl:block lg:block   ">
        <div
          className="img-container relative  rounded-md overflow-hidden 2xl:overflow-x-hidden md:scale-75
           2xl:scale-100 lg:scale-100 2xl:w-full 
           2xl:h-[80vh]  lg:h-80vh]  lg:w-full "
        >
          <div className="laptop-ipad-big-laptop hidden 2xl:block lg:block ">
            <div
              className="navbar z-50  w-full text-center flex justify-between items-center p-2 2xl:bg-transparent 2xl:px-6 
               lg:bg-transparent lg:px-6 2xl:absolute lg:absolute   "
            >
              <div className=" 2xl:flex 2xl:items-center 2xl:gap-3 lg:flex lg:items-center lg:gap-3 ">
                <Header />
                <div className="invisible 2xl:visible lg:visible">
                  <ul className="text-white 2xl:font-bold xl:font-bold 2xl:flex 2xl:gap-3 lg:flex lg:gap-3 hover:cursor-pointer ">
                    <Link to={"/Browse"}>
                      {" "}
                      <li className=" hover:underline">Home</li>
                    </Link>

                    <Link to={"/Shows"}>
                      {" "}
                      <li className=" hover:underline">Tv Show</li>{" "}
                    </Link>
                    <li className=" hover:underline">Movies</li>
                    <li className=" hover:underline">Recently Added</li>
                    <li className=" hover:underline">My List</li>
                  </ul>
                </div>
              </div>
              <div className="2xl:flex 2xl:items-center 2xl:gap-5 lg:flex lg:items-center lg:gap-3">
                <i
                  className="fa-solid fa-magnifying-glass text-black text-3xl opacity-70 2xl:text-white
                 lg:text-white hover:cursor-pointer"
                ></i>{" "}
                <div
                  className="relative "
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <img
                    className="h-10 hover:cursor-pointer"
                    src={user?.photoURL}
                  />
                  <div
                    className={` absolute  text-xl -left-4 rounded py-1 cursor-pointer ${
                      isHovered ? "" : "hidden"
                    } `}
                  >
                    <Link to={`/profile/${user?.displayName}`}>
                      <p className="text-white bg-hotstar py-3  px-4 mb-2">
                        Profile
                      </p>
                    </Link>
                    <p
                      onClick={HandleSignOut}
                      className="text-white bg-hotstar py-3"
                    >
                      Sign out
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="2xl:visible 2xl:w-full lg:visible lg:w-full 2xl:rounded-none "></div>
        </div>
      </div> */}
    </div>
  );
};

export default MainPoster;
