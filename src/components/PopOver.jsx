import React, { useState } from "react";
import { POSTER_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteMovies, addWatchLaterMovies } from "../utils/savedSlice";
import { Link, NavLink } from "react-router-dom";
import {
  IconPlayerPlay,
  IconHeart,
  IconPlus,
  IconCheck,
} from "@tabler/icons-react";

// Import Firebase modules
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";

// Initialize Firebase (you should replace these with your actual Firebase config)
const firebaseConfig = {
  // Your Firebase configuration object
};

// Initialize Firebase app
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export default function PopOver({
  movie,
  id,
  poster_path,
  title,
  overview,
  release_date,
  genres,
}) {
  const WatchLater = collection(db, "WatchLater");
  const Favorite = collection(db, "Favorite");

  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);
  const dispatch = useDispatch();

  const email = useSelector((store) => store.user.email);

  const HandleWatchLater = async () => {
    if (!isWatchLater) {
      setIsWatchLater(true);
      dispatch(addWatchLaterMovies(movie));
      try {
        await addDoc(WatchLater, { movies: movie, email: email });
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  const HandleFavorite = async () => {
    if (!isFavorite) {
      setIsFavorite(true);
      dispatch(addFavoriteMovies(movie));
      try {
        await addDoc(Favorite, { movies: movie, email: email });
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto bg-black/90">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className="relative w-full max-w-2xl h-[80vh] rounded-lg overflow-hidden shadow-xl"
          style={{
            backgroundImage: `url(${POSTER_URL + poster_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
              <h2 className="text-4xl font-bold text-white text-shadow text-wrap">
                {title} {release_date && `(${release_date.split("-")[0]})`}
              </h2>
              <p className="text-lg text-white text-shadow">
                {genres && genres.length > 0
                  ? genres.join(", ")
                  : "Genre not available"}
              </p>
              <div className="bg-black/70 backdrop-blur-md p-4 rounded-lg text-wrap">
                <p className="text-base text-white">
                  {overview
                    ? overview.split(" ").splice(0, 30).join(" ")
                    : "Overview Not Available"}
                </p>
              </div>
              <div className="flex justify-between gap-2 pt-4">
                <NavLink
                  to={`/PlayingTrailer/${title}/${id}`}
                  className="flex-1 inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
                  <IconPlayerPlay size={20} className="mr-2" /> Play
                </NavLink>
                <button
                  onClick={HandleFavorite}
                  disabled={isFavorite}
                  className={`flex-1 inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm ${
                    isFavorite
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                  }`}>
                  {isFavorite ? (
                    <>
                      <IconCheck size={20} className="mr-2" /> Liked
                    </>
                  ) : (
                    <>
                      <IconHeart size={20} className="mr-2" /> Favorite
                    </>
                  )}
                </button>
                <button
                  onClick={HandleWatchLater}
                  disabled={isWatchLater}
                  className={`flex-1 inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm ${
                    isWatchLater
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                  }`}>
                  {isWatchLater ? (
                    <>
                      <IconCheck size={20} className="mr-2" /> Added
                    </>
                  ) : (
                    <>
                      <IconPlus size={20} className="mr-2" /> My List
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
