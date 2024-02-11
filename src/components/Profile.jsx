import { useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "./Navbar";
import { React, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../utils/firebase";
import ShowCard from "./ShowCard";

const Profile = () => {
  const userEmail = useSelector((store) => store.user?.email);
  const [watchLaterData, setWatchLaterData] = useState([]);
  const [favoriteData, setFavoriteData] = useState([]);

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

  return (
    <>
      <div className=" bg-black w-full min-h-[130vh] ">
        <div className="navbar py-4  h-14">
          <Navbar />
        </div>

        <div className="">
          {watchLaterData && watchLaterData.length > 0 ? (
            <ShowCard title={"Watch Later .."} movies={watchLaterData} />
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
      </div>
    </>
  );
};

export default Profile;
