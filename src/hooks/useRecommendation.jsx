/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux";
import { API_OPTIONS, BASE_URL } from "../utils/constant";
import { addRecommendations, addRecSeries } from "../utils/movieSlice";
import { useEffect } from "react";

const useRecommendation = ({ id }) => {
  const dispatch = useDispatch();
  console.log(id, "id is here");
  const getRecommendation = async () => {
    const data = await fetch(
      ""+ BASE_URL +"movie/" +
        id +
        "/recommendations?language=en-US&page=1",
      API_OPTIONS
    );

    const series = await fetch(
      ""+ BASE_URL +"tv/" +
        id +
        "/recommendations?language=en-US&page=1",
      API_OPTIONS
    );

    const json = await data.json();
    const seriesData = await series.json();
    console.log(json);
    console.log(seriesData);
    dispatch(addRecommendations(json.results));
    dispatch(addRecSeries(seriesData.results));
    
  };

  useEffect(() => {
    getRecommendation();
  }, []);
};
export default useRecommendation;
