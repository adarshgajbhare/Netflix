import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import NavbarBottom from "./NavbarBottom";
import { POSTER_URL } from "../utils/constant";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { database } from "../utils/firebase";

const ReviewPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const movieFromState = location.state?.movie;

  const [watchedDate, setWatchedDate] = useState("");
  const [rating, setRating] = useState("5");
  const [review, setReview] = useState("");
  const [movieMeta, setMovieMeta] = useState(movieFromState || null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const movieId = useMemo(() => Number(id), [id]);

  useEffect(() => {
    if (!user?.email || !movieId) return;

    const loadExistingReview = async () => {
      try {
        const reviewDocRef = doc(
          database,
          "WatchedReviews",
          `${user.email}_${movieId}`
        );
        const snapshot = await getDoc(reviewDocRef);

        if (snapshot.exists()) {
          const data = snapshot.data();
          setWatchedDate(data.watchedDate || "");
          setRating(String(data.rating || "5"));
          setReview(data.review || "");
          setMovieMeta((prev) => prev || data.movie || null);
        }
      } catch (error) {
        console.error("Error loading review:", error);
      }
    };

    loadExistingReview();
  }, [movieId, user?.email]);

  const handleSaveReview = async (event) => {
    event.preventDefault();
    if (!user?.email || !movieId || !watchedDate || !rating) {
      setMessage("Please fill watched date and rating.");
      return;
    }

    setLoading(true);
    setMessage("");

    const title = movieMeta?.title || movieMeta?.name || `Movie #${movieId}`;
    const reviewDocId = `${user.email}_${movieId}`;

    try {
      await setDoc(doc(database, "WatchedReviews", reviewDocId), {
        email: user.email,
        movieId,
        movie: {
          id: movieId,
          title,
          poster_path: movieMeta?.poster_path || null,
          release_date: movieMeta?.release_date || null,
          media_type: movieMeta?.media_type || "movie",
        },
        watchedDate,
        rating: Number(rating),
        review: review.trim(),
        updatedAt: serverTimestamp(),
      });

      setMessage("Review saved successfully.");
      setTimeout(() => navigate(`/profile/${user.displayName}`), 700);
    } catch (error) {
      console.error("Error saving review:", error);
      setMessage("Failed to save review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#131313] text-white">
      <div className="hidden 2xl:block lg:block md:block py-4">
        <Navbar />
      </div>

      <div className="mx-auto w-full max-w-4xl px-4 pt-24 pb-28 2xl:pt-8 lg:pt-8 md:pt-8">
        <div className="mb-6">
          <Link
            to={`/profile/${user?.displayName || ""}`}
            className="text-sm text-white/70 hover:text-white">
            Back to Profile
          </Link>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/40 p-5 md:p-8">
          <div className="mb-6 flex items-center gap-4">
            {movieMeta?.poster_path ? (
              <img
                src={POSTER_URL + movieMeta.poster_path}
                alt={movieMeta?.title || "movie poster"}
                className="h-24 w-16 rounded object-cover"
              />
            ) : (
              <div className="h-24 w-16 rounded bg-white/10" />
            )}
            <div>
              <h1 className="text-2xl font-bold">
                {movieMeta?.title || movieMeta?.name || `Movie #${movieId}`}
              </h1>
              <p className="text-sm text-white/60">
                Add watched date, your rating, and review.
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveReview} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Watched Date</label>
              <input
                type="date"
                value={watchedDate}
                onChange={(e) => setWatchedDate(e.target.value)}
                className="w-full rounded-md border border-white/20 bg-[#1d1d1d] px-3 py-3 outline-none focus:border-[#E50914]"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Rating (1-5)</label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full rounded-md border border-white/20 bg-[#1d1d1d] px-3 py-3 outline-none focus:border-[#E50914]">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Review</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={6}
                placeholder="Write your review..."
                className="w-full rounded-md border border-white/20 bg-[#1d1d1d] px-3 py-3 outline-none focus:border-[#E50914]"
              />
            </div>

            {message ? <p className="text-sm text-white/80">{message}</p> : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-[#E50914] px-4 py-3 font-semibold text-white hover:bg-[#b20710] disabled:cursor-not-allowed disabled:opacity-70">
              {loading ? "Saving..." : "Save Review"}
            </button>
          </form>
        </div>
      </div>

      <div className="2xl:hidden lg:hidden md:hidden">
        <NavbarBottom />
      </div>
    </div>
  );
};

export default ReviewPage;
