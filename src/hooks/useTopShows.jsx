/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux";
import { API_OPTIONS,  TOP_RATED_MOVIES_API } from "../utils/constant";
import {  addTopShows } from "../utils/showsSlice";
import { useEffect } from "react";

const useTopShows = () => {
  console.log("useTopShows tv show");
  const dispatch = useDispatch();

  const getTopShows = async () => {
    console.log("getTopShows useeffect tv show");
    const data = await fetch(TOP_RATED_MOVIES_API, API_OPTIONS);
    const json = await data.json();
     console.log("show data here ", data.json())
    dispatch(addTopShows(json.results));
    
  };

  useEffect(() => {
    console.log("1111getTopShows useeffect tv show");
    getTopShows();
  }, []);
};

export default useTopShows;
