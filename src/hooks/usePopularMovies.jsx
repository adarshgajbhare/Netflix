/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux";
import { API_OPTIONS, POPULAR_MOVIES_API } from "../utils/constant";
import {  addPopularMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const getPopularMovies = async () => {
    const data = await fetch(POPULAR_MOVIES_API, API_OPTIONS);
    const json = await data.json();
    //console.log(json.results);
    dispatch(addPopularMovies(json.results));
    
  };

  useEffect(() => {
    getPopularMovies();
  }, []);
};
export default usePopularMovies;
