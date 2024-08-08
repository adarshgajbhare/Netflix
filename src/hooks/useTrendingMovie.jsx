/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux";
import { API_OPTIONS, NOW_PLAYING_MOVIES_API, TRENDING_MOVIES } from "../utils/constant";
import { addTrendingMovie } from "../utils/movieSlice";
import { useEffect } from "react";

const useTrendingMovie = () => {
  const dispatch = useDispatch();

  const getTrendingMovie = async () => {
    const data = await fetch(TRENDING_MOVIES, API_OPTIONS);
    const json = await data.json();

    dispatch(addTrendingMovie(json.results));
  };

  useEffect(() => {
    getTrendingMovie();
  }, []);
};
export default useTrendingMovie;
