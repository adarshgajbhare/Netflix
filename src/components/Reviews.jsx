import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import Navbar from "./Navbar";
import NavbarBottom from "./NavbarBottom";
import { database } from "../utils/firebase";
import { POSTER_URL } from "../utils/constant";

const Reviews = () => {
  const userEmail = useSelector((store) => store.user?.email);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!userEmail) return;

    const fetchReviews = async () => {
      try {
        const reviewsCollection = collection(database, "WatchedReviews");
        const reviewsQuery = query(reviewsCollection, where("email", "==", userEmail));
        const reviewsSnapshot = await getDocs(reviewsQuery);

        const data = reviewsSnapshot.docs
          .map((docItem) => ({ id: docItem.id, ...docItem.data() }))
          .sort((a, b) => (b?.watchedDate || "").localeCompare(a?.watchedDate || ""));

        setReviews(data);
      } catch (error) {
        console.error("Error loading reviews:", error);
      }
    };

    fetchReviews();
  }, [userEmail]);

  return (
    <div className="min-h-screen bg-[#0f141a] pb-24 text-white">
      <div className="hidden h-14 py-4 md:block">
        <Navbar />
      </div>

      <main className="mx-auto mt-5 w-full max-w-6xl space-y-4 px-4 pt-4 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-[#2f3c4d] bg-[#182028] p-5">
          <h1 className="text-3xl font-black">Your Reviews</h1>
          <p className="mt-1 text-sm text-slate-300">
            All watched titles with your rating and notes.
          </p>
        </section>

        {reviews.length ? (
          <section className="grid gap-3">
            {reviews.map((item) => (
              <article
                key={item.id}
                className="flex gap-3 rounded-xl border border-[#344559] bg-[#121920] p-3">
                <div className="h-24 w-16 shrink-0 overflow-hidden rounded-md">
                  {item?.movie?.poster_path ? (
                    <img
                      src={`${POSTER_URL}${item.movie.poster_path}`}
                      alt={item?.movie?.title || "poster"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#1a2430] text-xs text-slate-300">
                      No Poster
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-white">
                    {item?.movie?.title || "Untitled"}
                  </p>
                  <p className="text-xs text-[#40bcf4]">{item?.rating || 0}/5 stars</p>
                  <p className="text-xs text-slate-300">{item?.watchedDate || "NA"}</p>
                  <p className="mt-2 text-sm text-slate-200">
                    {item?.review || "No review text."}
                  </p>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <section className="rounded-xl border border-dashed border-[#44556a] bg-[#121920] p-5 text-sm text-slate-300">
            No reviews yet. Mark movies as watched and add your review from popup.
          </section>
        )}
      </main>

      <div className="md:hidden">
        <NavbarBottom />
      </div>
    </div>
  );
};

export default Reviews;
