import React, { useEffect, useState } from "react";
import { POSTER_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteMovies,
  addWatchLaterMovies,
  removeFavoriteMovie,
  removeWatchLaterMovie,
} from "../utils/savedSlice";
import { NavLink } from "react-router-dom";
import {
  IconPlayerPlay,
  IconHeart,
  IconPlus,
  IconStar,
  IconTrash,
} from "@tabler/icons-react";

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { database } from "../utils/firebase";

export default function PopOver({
  onClose,
  movie,
  id,
  poster_path,
  title,
  overview,
  release_date,
  genres,
}) {
  const WatchLater = collection(database, "WatchLater");
  const Favorite = collection(database, "Favorite");

  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);
  const [hasReview, setHasReview] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [watchedDate, setWatchedDate] = useState("");
  const [rating, setRating] = useState("5");
  const [reviewText, setReviewText] = useState("");
  const [episodesWatched, setEpisodesWatched] = useState("");
  const [avgEpisodeMinutes, setAvgEpisodeMinutes] = useState("30");
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [watchLaterLoading, setWatchLaterLoading] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewMessage, setReviewMessage] = useState("");
  const dispatch = useDispatch();

  const email = useSelector((store) => store.user?.email);
  const isShow =
    movie?.media_type === "tv" ||
    movie?.media_type === "show" ||
    !!movie?.first_air_date ||
    (!!movie?.name && !movie?.title);

  useEffect(() => {
    if (!email || !movie?.id) return;

    const syncSavedState = async () => {
      try {
        const watchLaterQuery = query(
          WatchLater,
          where("email", "==", email),
          where("movies.id", "==", movie.id)
        );

        const favoriteQuery = query(
          Favorite,
          where("email", "==", email),
          where("movies.id", "==", movie.id)
        );

        const [watchLaterSnapshot, favoriteSnapshot] = await Promise.all([
          getDocs(watchLaterQuery),
          getDocs(favoriteQuery),
        ]);

        const reviewDocRef = doc(database, "WatchedReviews", `${email}_${movie.id}`);
        const reviewSnapshot = await getDoc(reviewDocRef);

        setIsWatchLater(!watchLaterSnapshot.empty);
        setIsFavorite(!favoriteSnapshot.empty);
        setHasReview(reviewSnapshot.exists());

        if (reviewSnapshot.exists()) {
          const reviewData = reviewSnapshot.data();
          setWatchedDate(reviewData?.watchedDate || "");
          setRating(String(reviewData?.rating || "5"));
          setReviewText(reviewData?.review || "");
          setEpisodesWatched(
            reviewData?.episodesWatched !== undefined
              ? String(reviewData.episodesWatched)
              : ""
          );
          setAvgEpisodeMinutes(
            reviewData?.avgEpisodeMinutes !== undefined
              ? String(reviewData.avgEpisodeMinutes)
              : "30"
          );
        }
      } catch (error) {
        console.error("Error syncing saved state: ", error);
      }
    };

    syncSavedState();
  }, [email, movie?.id]);

  const HandleWatchLater = async () => {
    if (!email || !movie?.id || watchLaterLoading) return;

    setWatchLaterLoading(true);
    try {
      const watchLaterQuery = query(
        WatchLater,
        where("email", "==", email),
        where("movies.id", "==", movie.id)
      );
      const snapshot = await getDocs(watchLaterQuery);

      if (snapshot.empty) {
        await addDoc(WatchLater, { movies: movie, email: email });
        dispatch(addWatchLaterMovies(movie));
        setIsWatchLater(true);
      } else {
        await Promise.all(snapshot.docs.map((docItem) => deleteDoc(docItem.ref)));
        dispatch(removeWatchLaterMovie(movie.id));
        setIsWatchLater(false);
      }
    } catch (error) {
      console.error("Error updating watch later: ", error);
    } finally {
      setWatchLaterLoading(false);
    }
  };

  const HandleFavorite = async () => {
    if (!email || !movie?.id || favoriteLoading) return;

    setFavoriteLoading(true);
    try {
      const favoriteQuery = query(
        Favorite,
        where("email", "==", email),
        where("movies.id", "==", movie.id)
      );
      const snapshot = await getDocs(favoriteQuery);

      if (snapshot.empty) {
        await addDoc(Favorite, { movies: movie, email: email });
        dispatch(addFavoriteMovies(movie));
        setIsFavorite(true);
      } else {
        await Promise.all(snapshot.docs.map((docItem) => deleteDoc(docItem.ref)));
        dispatch(removeFavoriteMovie(movie.id));
        setIsFavorite(false);
      }
    } catch (error) {
      console.error("Error updating favorite: ", error);
    } finally {
      setFavoriteLoading(false);
    }
  };

  const HandleSaveWatched = async () => {
    if (!email || !movie?.id || reviewLoading) return;
    if (!watchedDate) {
      setReviewMessage("Please select watched date.");
      return;
    }
    if (isShow && (!episodesWatched || Number(episodesWatched) <= 0)) {
      setReviewMessage("Please add how many episodes you watched.");
      return;
    }

    setReviewLoading(true);
    setReviewMessage("");

    try {
      const reviewDocId = `${email}_${movie.id}`;
      await setDoc(doc(database, "WatchedReviews", reviewDocId), {
        email,
        movieId: movie.id,
        movie: {
          ...movie,
          title: movie?.title || movie?.name || title,
          poster_path,
          release_date: release_date || movie?.release_date || null,
        },
        watchedDate,
        rating: Number(rating),
        review: reviewText.trim(),
        episodesWatched: isShow ? Number(episodesWatched) : 0,
        avgEpisodeMinutes: isShow ? Number(avgEpisodeMinutes || 0) : 0,
        totalWatchMinutes: isShow
          ? Number(episodesWatched || 0) * Number(avgEpisodeMinutes || 0)
          : 0,
        updatedAt: serverTimestamp(),
      });

      setHasReview(true);
      setReviewMessage("Saved successfully.");
      setShowReviewForm(false);
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Error saving watched review: ", error);
      setReviewMessage("Failed to save. Please try again.");
    } finally {
      setReviewLoading(false);
    }
  };

  return (
    <div
      className="fixed z-50 inset-0 overflow-y-auto bg-black/90"
      onClick={onClose}>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl min-h-[80vh] rounded-lg overflow-hidden shadow-xl"
          style={{
            backgroundImage: `url(${POSTER_URL + poster_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-[60] h-10 w-10 rounded-full bg-black/70 text-white border border-white/30 hover:bg-black/90">
            X
          </button>
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
                  disabled={favoriteLoading}
                  className={`flex-1 inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm ${
                    isFavorite
                      ? "bg-gray-700 hover:bg-gray-800 focus:ring-gray-500"
                      : "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                  }`}>
                  {isFavorite ? (
                    <>
                      <IconTrash size={20} className="mr-2" /> Remove Favorite
                    </>
                  ) : (
                    <>
                      <IconHeart size={20} className="mr-2" /> Favorite
                    </>
                  )}
                </button>
                <button
                  onClick={HandleWatchLater}
                  disabled={watchLaterLoading}
                  className={`flex-1 inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm ${
                    isWatchLater
                      ? "bg-gray-700 hover:bg-gray-800 focus:ring-gray-500"
                      : "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                  }`}>
                  {isWatchLater ? (
                    <>
                      <IconTrash size={20} className="mr-2" /> Remove
                    </>
                  ) : (
                    <>
                      <IconPlus size={20} className="mr-2" /> My List
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setShowReviewForm((prev) => !prev);
                    setReviewMessage("");
                  }}
                  className="flex-1 inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:text-sm">
                  <IconStar size={20} className="mr-2" />
                  {hasReview ? "Your Review" : "Mark Watched"}
                </button>
              </div>

              {showReviewForm ? (
                <div className="mt-4 rounded-md border border-white/20 bg-black/70 p-4 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-sm text-white/80">
                        Watched Date
                      </label>
                      <input
                        type="date"
                        value={watchedDate}
                        onChange={(e) => setWatchedDate(e.target.value)}
                        className="w-full rounded-md border border-white/20 bg-[#1d1d1d] px-3 py-2 text-white outline-none focus:border-[#E50914]"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm text-white/80">
                        Rating
                      </label>
                      <div className="flex items-center gap-2 rounded-md border border-white/20 bg-[#1d1d1d] px-3 py-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(String(star))}
                            className="hover:scale-110 transition-transform">
                            <IconStar
                              size={22}
                              className={
                                Number(rating) >= star
                                  ? "text-yellow-400"
                                  : "text-white/40"
                              }
                              fill={
                                Number(rating) >= star ? "currentColor" : "none"
                              }
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-white/80">
                      Review
                    </label>
                    <textarea
                      rows={4}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Write your review..."
                      className="w-full rounded-md border border-white/20 bg-[#1d1d1d] px-3 py-2 text-white outline-none focus:border-[#E50914]"
                    />
                  </div>
                  {isShow ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1 block text-sm text-white/80">
                          Episodes Watched
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={episodesWatched}
                          onChange={(e) => setEpisodesWatched(e.target.value)}
                          className="w-full rounded-md border border-white/20 bg-[#1d1d1d] px-3 py-2 text-white outline-none focus:border-[#E50914]"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm text-white/80">
                          Minutes / Episode
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={avgEpisodeMinutes}
                          onChange={(e) => setAvgEpisodeMinutes(e.target.value)}
                          className="w-full rounded-md border border-white/20 bg-[#1d1d1d] px-3 py-2 text-white outline-none focus:border-[#E50914]"
                        />
                      </div>
                    </div>
                  ) : null}
                  {reviewMessage ? (
                    <p className="text-sm text-white/80">{reviewMessage}</p>
                  ) : null}
                  <button
                    onClick={HandleSaveWatched}
                    disabled={reviewLoading}
                    className="w-full rounded-md bg-[#E50914] px-4 py-2 font-semibold text-white hover:bg-[#b20710] disabled:cursor-not-allowed disabled:opacity-70">
                    {reviewLoading ? "Saving..." : "Save Watched Details"}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
