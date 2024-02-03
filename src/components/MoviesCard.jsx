/* eslint-disable react/prop-types */
import { POSTER_URL } from "../utils/constant";

const MoviesCard = ({ poster_path }) => {
  return (
    <div className=" w-[28%] h-55 flex-shrink-0 snap-start ">
      <img
        className="h-full w-full object-cover rounded-md "
        src={POSTER_URL + poster_path}
        alt="movie posters"
      />
    </div>
  );
};

export default MoviesCard;
