import { Link } from "react-router-dom";

import React from "react";
import { IconMinusVertical } from "@tabler/icons-react";
const TopSmallNav = () => {
  return (
    <>
      <div
        className="bg-white/10 filter backdrop-blur-sm   mt-16 z-50 justify-between  cursor-pointer w-[70%]  flex  items-center  rounded-full  text-center text-sm text-white  py-2 px-4 mx-auto
      2xl:hidden lg:hidden ">
        <Link to={"/Shows"}>
          <button
            className="flex-1 cursor-pointer p-1 rounded-full
           hover:transition-all duration-100
           bg-gradient-to-r from-black to-[#B20710] bg-[length:0%_100%] bg-left hover:bg-[length:100%_100%]">
            TV Shows
          </button>
        </Link>
        <IconMinusVertical size={16} opacity={50} className="opacity-50" />
        <Link to={"/browse"}>
          <button
            className="flex-1 cursor-pointer p-1 rounded-full
           hover:transition-all duration-100
           bg-gradient-to-r from-black to-[#B20710] bg-[length:0%_100%] bg-left hover:bg-[length:100%_100%] ">
            Movies
          </button>
        </Link>
        <IconMinusVertical size={16} opacity={50} className="opacity-50" />
        <Link to={"/"}>
          <button
            className="flex-1 cursor-pointer p-1 rounded-full
           hover:transition-all duration-100
           bg-gradient-to-r from-black to-[#B20710] bg-[length:0%_100%] bg-left hover:bg-[length:100%_100%] w-min-0 text-center">
            Category
          </button>
        </Link>
      </div>
    </>
  );
};

export default TopSmallNav;
