

import React, { useRef, useState } from "react";
import { API_OPTIONS, BASE_URL, NETFLIX_BACKGROUND } from "../utils/constant";
import Navbar from "./Navbar";

import ShowCard from "./ShowCard";
import { useDispatch, useSelector } from "react-redux";
import { searchedShows } from "../utils/showsSlice";
import { searchedMovies } from "../utils/movieSlice";
import NavbarBottom from "./NavbarBottom";

const Search = () => {
  const movieSearch = useSelector((store) => store.movies);
  const showSearch = useSelector((store) => store.shows);
  const [cards, setCards] = useState(false);
  const nameText = useRef(null);
  const dispatch = useDispatch();

  const HandleSearch = () => {
    const searchText = nameText.current.value;
    console.log(searchText);
    getSearch(searchText);
    setCards(true);
    gsap.from(".searchCard", {
      duration:1,
       scale:0.2,
       opacity:0,
    })
  };

  const getSearch = (searchText) => {
    getSearchResults(searchText);
  };
  const getSearchResults = async (searchText) => {
    const searchMovie = await fetch(
      `${BASE_URL}search/movie?query=${searchText}&include_adult=false&language=en-US&page=1
    `,
      API_OPTIONS
    );
    const searchShows = await fetch(
      `${BASE_URL}search/tv?query=${searchText}&include_adult=false&language=en-US&page=1
    `,
      API_OPTIONS
    );

    const movieResults = await searchMovie.json();
    const showResults = await searchShows.json();

    dispatch(searchedMovies(movieResults.results));
    dispatch(searchedShows(showResults.results));
    console.log(movieSearch?.searchedMovies);
  };
  return (
    <>
      <div className="main-div min-h-screen  w-full  overflow-hidden relative ">
        <div className=" overflow-hidden h-full w-full absolute -z-50 ">
          <img
            src={NETFLIX_BACKGROUND}
            className="object-cover object-center h-full w-full"
          />
        </div>
        <div className="overlay absolute inset-0 bg-black opacity-60 -z-50"></div>

        <div className="navbar z-50 h-20">
          <Navbar />
        </div>
        <div className="search-bar w-full font-semibold text-xs text-center  z-50 px-4 ">
          <input
            type="text"
            placeholder="Search Movies and Shows..."
            ref={nameText}
            className=" 2xl:px-2 2xl:py-4 2xl:w-[25%] rounded-md  2xl:mr-4  text-white bg-glass  outline-none text-md
            w-full px-2 py-4 "
          />
          <button
            onClick={HandleSearch}
            className="bg-[#e50914] mt-4 text-white  px-12 py-4  rounded-md  w-full 2xl:w-fit 2xl:mt-0" 
          >
            Search
          </button>
        </div>

        <div className="searchCard mb-10">
          {cards ? (
            <ShowCard
              title={"Searched Movies"}
              movies={movieSearch?.searchedMovies}
            />
          ) : (
            ""
          )}
          {cards ? (
            <ShowCard
              title={"Searched Shows"}
              movies={showSearch?.searchedShows}
            />
          ) : (
            ""
          )}
        </div>
        <dir className="addingLittleSpace  h-24 2xl:hidden md:hidden lg:hidden"></dir>
        <div className="2xl:hidden ">
          <NavbarBottom />
        </div>
      </div>
    </>
  );
};

export default Search;

{
  /* <div className="img relative ">
<div className="p-4  h-20  fixed top-0 z-50 w-full bg-black">
  <Navbar />
</div>
<div className="absolute brightness-50 -z-50 inset-0 w-full h-full"> 
  <img src={NETFLIX_BACKGROUND}  className="  object-cover  object-center" />
  </div>
  <div className="search-bar  py-12  flex justify-center gap-4 border bg-red-500 mt-96">
    <input
      className="px-4 py-4 w-96  text-black font-bold rounded-md border     "
      type="text"
      name="movieName"
      id="movieName"
      placeholder="Search Movies and Shows..."
      ref={nameText}
    />
    <button
      onClick={HandleSearch}
      className="bg-white text-black py-4 px-10 rounded-md text-start font-bold"
    >
      Search
    </button>
  </div>

  <div className=" relative ">
    {cards ? (
      <ShowCard
        title={"Searched Movies"}
        movies={movieSearch?.searchedMovies}
      />
    ) : (
      ""
    )}
    {cards ? (
      <ShowCard
        title={"Searched Shows"}
        movies={showSearch?.searchedShows}
      />
    ) : (
      ""
    )}
  </div>
  <div className="2xl:hidden">
    <NavbarBottom />
  </div>
</div> */
}
