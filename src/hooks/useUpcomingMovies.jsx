/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux";
import { API_OPTIONS, UPCOMING_MOVIES_API } from "../utils/constant";
import {  addUpcomingMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  const getUpcomingMovies = async () => {
    const data = await fetch(UPCOMING_MOVIES_API, API_OPTIONS);
    const json = await data.json();
    //console.log(json.results);
    dispatch(addUpcomingMovies  (json.results));
  };

  useEffect(() => {
    getUpcomingMovies();
  }, []);
};
export default useUpcomingMovies;
