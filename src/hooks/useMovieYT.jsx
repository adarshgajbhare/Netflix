import { API_OPTIONS } from "../utils/constant";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addBigMovieTrailer, resetSeriesTrailer } from "../utils/trailerSlice";

const useMovieYT = ({ id }) => {
  const dispatch = useDispatch();
 
  const getVideo = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/" + id + "/videos?language=en-US",
      API_OPTIONS
    );
    const data = await response.json();
    const filterTrailer = data.results.filter(
      (video) => video.type === "Trailer"
    );
    const trailer = filterTrailer.length ? filterTrailer[0] : data.results[0];
    dispatch(addBigMovieTrailer(trailer));
    dispatch(resetSeriesTrailer);
  };

  useEffect(() => {
    getVideo();
  }, []);
};

export default useMovieYT;
