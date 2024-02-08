import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addBigShowTrailer } from "../utils/trailerSlice";

const useShowYT = ({ id }) => {
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
    dispatch(addBigShowTrailer(trailer));
  
  };

  useEffect(() => {
    getShowTrailer();
  }, []);
};

export default useShowYT;
