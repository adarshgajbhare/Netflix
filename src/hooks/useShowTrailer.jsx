import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {  addShowTrailer } from "../utils/showsSlice";
import { API_OPTIONS } from "../utils/constant";
import { resetMovieTrailer } from "../utils/trailerSlice";


const useShowTrailer = ({ id }) => {
  const dispatch = useDispatch();

  const getShowTrailer = async () => {
    const vid = await fetch(
      "https://api.themoviedb.org/3/tv/" + id + "/videos?language=en-US",
   
      API_OPTIONS
    );

    const data = await vid.json();

    const filterTrailer = data.results.filter(
      (video) => video.type === "Trailer"
    );
    const trailer = filterTrailer.length ? filterTrailer[0] : data.results[0];
    dispatch(addShowTrailer(trailer));
    dispatch(resetMovieTrailer);
  };

  useEffect(() => {
    getShowTrailer();
  }, []);
};

export default useShowTrailer;
