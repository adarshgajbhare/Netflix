import { useSelector } from "react-redux";
import MainPoster from "./MainPoster";

const MainContainer = () => {
  const movies = useSelector((store) => store?.movies?.nowPlayingMovies);
  if (!movies) return;
  const mainMovie = movies[1];
  const { original_title, poster_path, title } = mainMovie;

  return (
    <div className="mt-16 md:mt-0 ">
     
      <MainPoster
        title={title}
        poster_path={poster_path}
        original_title={original_title}
      />
     
    </div>
  );
};

export default MainContainer;
