/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux";
import { API_OPTIONS, POPULAR_SHOW } from "../utils/constant";
import { addArrivingTodayShows } from "../utils/showsSlice";
import { useEffect } from "react";

const useArrivingTodayShow = () => {
  const dispatch = useDispatch();
  const getArrivingTodayShows = async () => {
    const data = await fetch(POPULAR_SHOW, API_OPTIONS);
    const json = await data.json();
    dispatch(addArrivingTodayShows(json.results));
  };

  useEffect(() => {
    getArrivingTodayShows();
  }, []);
};

export default useArrivingTodayShow;
