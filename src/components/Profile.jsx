import { useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "./Navbar";
import { React, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, database } from "../utils/firebase";
import ShowCard from "./ShowCard";
import NavbarBottom from "./NavbarBottom";
import TopSmallNav from "./TopSmallNav";
import Header from "./Header";
import { signOut } from "firebase/auth";
import { removeUser } from "../utils/userSlice";

const Profile = () => {
  const userEmail = useSelector((store) => store.user?.email);
  const [watchLaterData, setWatchLaterData] = useState([]);
  const [favoriteData, setFavoriteData] = useState([]);
  const userName = useSelector((store) => store.user?.displayName);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const watchLaterCollection = collection(database, "WatchLater");
        const favoriteCollection = collection(database, "Favorite");

        const watchLaterSnapshot = await getDocs(watchLaterCollection);
        const favoriteSnapshot = await getDocs(favoriteCollection);

        const watchLaterData = watchLaterSnapshot.docs.map((doc) => ({
          id: doc.id,
          email: doc.data().email,
          ...doc.data().movies,
        }));

        const favoriteData = favoriteSnapshot.docs.map((doc) => ({
          id: doc.id,
          email: doc.data().email,
          ...doc.data().movies,
        }));

        const filterWatchLater = watchLaterData.filter(
          (item) => userEmail == item.email
        );

        const filterFavorite = favoriteData.filter(
          (item) => userEmail == item.email
        );

        setWatchLaterData(filterWatchLater);
        setFavoriteData(filterFavorite);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const HandleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatchEvent(removeUser());
      })
      .catch((error) => {});
  };

  return (
    <>
      <div className=" bg-black w-full min-h-[130vh] ">
        <div className="navbar py-4  h-14 hidden 2xl:block lg:block md:block">
          <Navbar />
        </div>
        <div className="mobile 2xl:hidden lg:hidden md:hidden ">
          <div className="navbar z-50 bg-glass fixed w-full text-center flex justify-between items-center mb-56 p-2">
            <Header />

            <i  onClick={HandleSignOut}
              className="fa-solid fa-power-off text-white text-3xl pr-2"
            >

            </i>
          </div>
        </div>{" "}
        <div className="relative w-full">
          <TopSmallNav />
        </div>
        <div>
          <h1 className="text-white font-bold text-3xl my-3 ml-6">Welcom back, {userName} </h1>
        </div>
        <div className="my-3">
          {watchLaterData && watchLaterData.length > 0 ? (
            <ShowCard title={"Watch later"} movies={watchLaterData} />
          ) : (
            " "
          )}
        </div>
        <div className="   ">
          {favoriteData && favoriteData.length > 0 ? (
            <ShowCard title={"Your Favorites.."} movies={favoriteData} />
          ) : (
            " "
          )}
        </div>
        <div className="2xl:hidden lg:hidden md:hidden">
          <NavbarBottom />
        </div>
      </div>
    </>
  );
};

export default Profile;
