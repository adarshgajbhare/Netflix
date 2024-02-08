import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { removeUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";

const Navbar = () => {
  const user = useSelector((store) => store?.user);
  const dispatch = useDispatch();
  const HandleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
      })
      .catch((error) => {});
  };

  return (
    <div className="laptop-ipad-big-laptop hidden 2xl:block lg:block ">
      <div
        className="navbar z-50  w-full text-center flex justify-between items-center p-2 2xl:bg-transparent 2xl:px-6 
               lg:bg-transparent lg:px-6 2xl:absolute lg:absolute   "
      >
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
                <li className=" hover:underline">Tv Show</li>{" "}
              </Link>
              <li className=" hover:underline">Movies</li>
              <li className=" hover:underline">Recently Added</li>
              <li className=" hover:underline">My List</li>
            </ul>
          </div>
        </div>
        <div className="2xl:flex 2xl:items-center 2xl:gap-3 lg:flex lg:items-center lg:gap-3">
          <img
            onClick={HandleSignOut}
            className="h-10 hover:cursor-pointer"
            src={user?.photoURL}
          />
          <i className="fa-solid fa-magnifying-glass text-black text-3xl opacity-70 2xl:text-white lg:text-white hover:cursor-pointer"></i>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
