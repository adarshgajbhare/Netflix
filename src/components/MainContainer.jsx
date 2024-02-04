/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useSelector } from "react-redux";
import MainPoster from "./MainPoster";
import BackgroundVideo from "./BackgroundVideo";
const MainContainer = () => {
  const movies = useSelector((store) => store?.movies?.nowPlayingMovies);
  if (!movies) return;
  const mainMovie = movies[1];
  const { original_title, poster_path, title, id } = mainMovie;

  return (
    <div className="mt-2 md:mt-0">
      <MainPoster
        title={title}
        poster_path={poster_path}
        original_title={original_title}
        id={id}
      />
    </div>
  );
};

export default MainContainer;