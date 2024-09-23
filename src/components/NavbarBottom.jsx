import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import {
  IconHome,
  IconHome2,
  IconSearch,
  IconStack2,
  IconStack2Filled,
  IconUserSquareRounded,
} from "@tabler/icons-react";
const NavbarBottom = () => {
  const user = useSelector((store) => store?.user);
  const [visibleOptions, setVisibleOptions] = useState(true);
  const HandleOptions = () => {
    setVisibleOptions(!visibleOptions);
  };
  return (
    <div
      className="navbar z-60 bg-black/75 filter backdrop-blur-2xl  
      justify-between fixed bottom-2 w-[54%]  rounded-full  text-center
     flex  items-center p-2  left-[23%] cursor-pointer px-4  ">
      <div className="">
        <Link to={"/Browse"}>
          <IconStack2Filled className="text-white size-8 cursor-pointer" />
          <p className="text-white text-xs ">Home</p>
        </Link>
      </div>

      <Link to={"/search"}>
        <div className="">
          <IconSearch className=" text-white size-8 cursor-pointer" />
          <p className="text-white text-xs ">Search</p>
        </div>{" "}
      </Link>

      <div className="">
        <div
          className={`fixed bg-glass h-[75.5vh] w-full right-1 bottom-24 ${
            visibleOptions ? "hidden" : ""
          }`}></div>

        <Link to={`/profile/${user?.displayName}`}>
          <div className="w-full">
            <IconUserSquareRounded className=" text-white size-8 cursor-pointer"/>
          </div>{" "}
        </Link>
        <p className="text-white text-xs  w-min-0 text-ellipsis overflow-hidden ...">
          {/* {user?.displayName}  */}Profile
        </p>
      </div>
    </div>
  );
};

export default NavbarBottom;
