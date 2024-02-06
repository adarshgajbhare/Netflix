/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux";
import { API_OPTIONS, POPULAR_SHOW } from "../utils/constant";
import { addPopularShows, addTopShows } from "../utils/showsSlice";
import { useEffect } from "react";

const usePopularShows = () => {
  const dispatch = useDispatch();
  const getPopularShows = async () => {
    const data = await fetch(POPULAR_SHOW, API_OPTIONS);
    const json = await data.json();
    dispatch(addPopularShows(json.results));
  };

  useEffect(() => {
    getPopularShows();
  }, []);
};

export default usePopularShows;
