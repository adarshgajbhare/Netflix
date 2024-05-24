import React, { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { removeUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import GapContainer from "./GapContainer";

const Navbar = () => {
  const user = useSelector((store) => store?.user);
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useDispatch();
  const HandleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
      })
      .catch((error) => {});
  };

  return (
    <div className="laptop-ipad-big-laptop hidden 2xl:block lg:block">
      <div className="laptop-ipad-big-laptop hidden  lg:flex 2xl:flex  justify-between py-2 px-4 ">
        <div className=" 2xl:flex 2xl:items-center 2xl:gap-3 lg:flex lg:items-center lg:gap-3 ">
          <Header />
          <div className="invisible 2xl:visible lg:visible">
            <ul className="text-white 2xl:font-bold xl:font-bold 2xl:flex 2xl:gap-3 lg:flex lg:gap-3 hover:cursor-pointer ">
              <Link to={"/Browse"}>
                {" "}
                <li className=" hover:underline">Home</li>
              </Link>

              <Link to={"/Shows"}>
                {" "}
                <li className=" hover:underline">TV Shows</li>{" "}
              </Link>
              <Link to={"/browse"}>
                {" "}
                <li className=" hover:underline">Movies</li>{" "}
              </Link>
              <li className=" hover:underline">Recently Added</li>
            <a href="#top-rated">   <li className=" hover:underline">My List</li></a>
            </ul>
          </div>
        </div>
        <div className="2xl:flex 2xl:items-center 2xl:gap-5 lg:flex lg:items-center lg:gap-3 ">
          <Link to="/search">
            {" "}
            <i
              className="fa-solid fa-magnifying-glass text-black text-3xl opacity-70 2xl:text-white
                 lg:text-white hover:cursor-pointer"
            ></i>{" "}
          </Link>
          <div
            className=" "
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              className="h-10 hover:cursor-pointer relative"
              src={user?.photoURL}
            />

            <div
              className={`absolute text-lg z-50 right-4 top-12  rounded flex flex-col gap-2 bg-[#131313]  cursor-pointer ${
                isHovered ? "" : "hidden"
              }  transition-all duration-200 ease-in`}
            >
              <Link to={`/profile/${user?.displayName}`}>
                <p className="text-white border-b border-white/10 px-4 py-2  flex-1 w-full text-left font-semibold ">
                  Profile
                </p>
              </Link>
              <p
                onClick={HandleSignOut}
                className="text-white border-b border-white/10 px-4 py-2 whitespace-nowrap flex-1 w-full text-left font-semibold "
              >
                Sign out
              </p>
            </div>
          </div>
        </div>
      </div>
     
      <GapContainer />
    </div>
  );
};

export default Navbar;
