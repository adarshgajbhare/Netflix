import { Link } from "react-router-dom";

import React from "react";
const TopSmallNav = () => {
  return (
    <>
      <div className="text-white text-sm font-bold mt-20 z-50 flex items-center justify-around gap-2  2xl:hidden lg:hidden ">
        <Link to={"/Shows"}>
          <button className="flex-1 rounded-[100vw] border-2 py-2 px-2">
            Tv Shows
          </button>
        </Link>
        <Link to={"/browse"}>
          <button className="flex-1 rounded-[100vw] border-2 py-2 px-2  ">
            Movies
          </button>
        </Link>
        <Link to={"/"}>
          <button className="flex-1 rounded-[100vw] border-2 py-2 px-1  w-min-0 text-center">
            <select className="text-white bg-black border-none rounded-sm text-center">
              <option disabled selected value="comedy">Categories</option>
              <option value="Action">Action & Adventure</option>
              <option value="Anime">Anime </option>
              <option value="Children">Children & Family</option>
              <option value="Horror">Horror</option>
              <option value="Sci-fi">Sci-fi & Fantasy</option>
              <option value="Thrillers">Thrillers</option>
            </select>
          </button>
        </Link>
      </div>
    </>
  );
};

export default TopSmallNav;
