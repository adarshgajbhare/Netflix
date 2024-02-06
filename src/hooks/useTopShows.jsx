/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux";
import { API_OPTIONS, TOP_TV_SHOW } from "../utils/constant";
import { addTopShows } from "../utils/showsSlice";
import { useEffect } from "react";

const useTopShows = () => {
  const dispatch = useDispatch();
  const getTopShows = async () => {
    const data = await fetch(TOP_TV_SHOW, API_OPTIONS);
    const json = await data.json();
    dispatch(addTopShows(json.results));
  };

  useEffect(() => {
    getTopShows();
  }, []);
};

export default useTopShows;
