/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux";
import { API_OPTIONS, NOW_PLAYING_MOVIES_API } from "../utils/constant";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () =>{
    const dispatch = useDispatch();
    
    const getNowPlayingMovies = async () => {
      const data = await fetch(NOW_PLAYING_MOVIES_API, API_OPTIONS);
      const json = await data.json();
      console.log(json.results);
      dispatch(addNowPlayingMovies(json.results));
    };

    useEffect(()=>{
      getNowPlayingMovies();
    },[])
  
}
export default  useNowPlayingMovies;