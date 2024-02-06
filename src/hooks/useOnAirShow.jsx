/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux";
import { API_OPTIONS, ON_AIR_SHOW } from "../utils/constant";
import { addOnAirShows } from "../utils/showsSlice";
import { useEffect } from "react";

const useOnAirShow = () => {
  const dispatch = useDispatch();
  const getOnAirShows = async () => {
    const data = await fetch(ON_AIR_SHOW, API_OPTIONS);
    const json = await data.json();
    dispatch(addOnAirShows(json.results));
  };

  useEffect(() => {
    getOnAirShows();
  }, []);
};

export default useOnAirShow;
