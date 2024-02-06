/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux";
import { API_OPTIONS,  TOP_RATED_MOVIES_API } from "../utils/constant";
import {  addTopMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useTopMovies = () => {
  const dispatch = useDispatch();

  const getTopMovies = async () => {
    const data = await fetch(TOP_RATED_MOVIES_API, API_OPTIONS);
    const json = await data.json();
  
    dispatch(addTopMovies(json.results));
    
  };

  useEffect(() => {
    getTopMovies();
  }, []);
};
export default useTopMovies;
