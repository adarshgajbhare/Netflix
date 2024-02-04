/* eslint-disable react/prop-types */
import { POSTER_URL } from "../utils/constant";

const MoviesCard = ({ poster_path }) => {
  return (
    <div
      className="rounded-md w-[28%] h-55 flex-shrink-0   snap-start  2xl:h-[450px] 2xl:w-[300px] lg:h-[400px] lg:w-[250px]
     "
    >
      <img
        className="h-full w-full object-cover rounded-md 2xl:hover:drop-shadow-2xl hover:scale-125 hover:duration-700 ease-in-out hover:cursor-pointer
       "
        src={POSTER_URL + poster_path}
        alt="movie posters"
      />

    </div>
  );
};

export default MoviesCard;
