import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import { IconCalendarStats } from "@tabler/icons-react";
import Navbar from "./Navbar";
import NavbarBottom from "./NavbarBottom";
import PopOver from "./PopOver";
import { database } from "../utils/firebase";
import { POSTER_URL } from "../utils/constant";

const getTitle = (item) => item?.title || item?.name || "Untitled";
const getYear = (item) =>
  item?.release_date ? item.release_date.split("-")[0] : "NA";
const getMediaType = (item) => {
  if (item?.media_type === "tv" || item?.media_type === "show") return "show";
  if (item?.media_type === "movie") return "movie";
  if (item?.first_air_date) return "show";
  if (item?.name && !item?.title) return "show";
  return "movie";
};

const dedupeByMovieId = (items = []) => {
  const map = new Map();
  items.forEach((item) => {
    const id = item?.id || item?.movieId;
    if (id && !map.has(id)) map.set(id, item);
  });
  return Array.from(map.values());
};

const MediaGridSection = ({
  title,
  subtitle,
  items,
  emptyText,
  showWatchedMeta = false,
  onSelect,
}) => {
  return (
    <section className="rounded-2xl border border-[#2f3845] bg-[#182028] p-4 md:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">{title}</h2>
          <p className="text-sm text-slate-300">{subtitle}</p>
        </div>
        <span className="rounded-full border border-[#425266] bg-[#0f141a] px-3 py-1 text-xs font-semibold text-white">
          {items.length}
        </span>
      </div>

      {items.length ? (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {items.map((item) => (
            <article
              key={`${item?.id || item?.movieId}-${title}`}
              onClick={() => onSelect(item)}
              className="group w-[105px] shrink-0 cursor-pointer overflow-hidden rounded-lg border border-[#334255] bg-[#121920] sm:w-[110px]">
              <div className="relative aspect-[2/3] w-full overflow-hidden">
                {item?.poster_path ? (
                  <img
                    src={`${POSTER_URL}${item.poster_path}`}
                    alt={getTitle(item)}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-black/40 text-xs text-slate-300">
                    No Poster
                  </div>
                )}
              </div>
              <div className="space-y-1 p-2">
                <p className="truncate text-xs font-semibold text-white">
                  {getTitle(item)}
                </p>
                {showWatchedMeta ? (
                  <>
                    <p className="text-[10px] text-slate-300">
                      {item?.watchedDate || "NA"}
                    </p>
                    {getMediaType(item) === "show" ? (
                      <p className="text-[10px] text-[#40bcf4]">
                        {item?.episodesWatched || 0} ep |{" "}
                        {Math.round((item?.totalWatchMinutes || 0) / 60)}h
                      </p>
                    ) : (
                      <p className="text-[10px] text-[#40bcf4]">
                        {item?.rating || 0}/5
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-[10px] text-slate-300">{getYear(item)}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-[#44556a] bg-[#121920] p-5 text-sm text-slate-300">
          {emptyText}
        </div>
      )}
    </section>
  );
};

const Profile = () => {
  const userEmail = useSelector((store) => store.user?.email);
  const userName = useSelector((store) => store.user?.displayName);

  const [watchLaterData, setWatchLaterData] = useState([]);
  const [favoriteData, setFavoriteData] = useState([]);
  const [watchedReviews, setWatchedReviews] = useState([]);
  const [activeMovie, setActiveMovie] = useState(null);

  useEffect(() => {
    if (!userEmail) return;

    const fetchData = async () => {
      try {
        const watchLaterCollection = collection(database, "WatchLater");
        const favoriteCollection = collection(database, "Favorite");
        const watchedReviewsCollection = collection(database, "WatchedReviews");

        const [watchLaterSnapshot, favoriteSnapshot, watchedReviewsSnapshot] =
          await Promise.all([
            getDocs(query(watchLaterCollection, where("email", "==", userEmail))),
            getDocs(query(favoriteCollection, where("email", "==", userEmail))),
            getDocs(
              query(watchedReviewsCollection, where("email", "==", userEmail))
            ),
          ]);

        const watchLater = dedupeByMovieId(
          watchLaterSnapshot.docs.map((docItem) => ({
            ...docItem.data().movies,
          }))
        );

        const favorite = dedupeByMovieId(
          favoriteSnapshot.docs.map((docItem) => ({
            ...docItem.data().movies,
          }))
        );

        const reviews = watchedReviewsSnapshot.docs.map((docItem) => ({
          id: docItem.id,
          ...docItem.data(),
        }));

        setWatchLaterData(watchLater);
        setFavoriteData(favorite);
        setWatchedReviews(reviews);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, [userEmail]);

  const watchedItems = useMemo(() => {
    const items = watchedReviews
      .map((item) => ({
        ...(item?.movie || {}),
        id: item?.movieId || item?.movie?.id,
        movieId: item?.movieId,
        watchedDate: item?.watchedDate,
        rating: item?.rating,
        review: item?.review,
        episodesWatched: item?.episodesWatched || 0,
        avgEpisodeMinutes: item?.avgEpisodeMinutes || 0,
        totalWatchMinutes: item?.totalWatchMinutes || 0,
      }))
      .filter((item) => item?.id || item?.movieId);
    return dedupeByMovieId(items).sort((a, b) =>
      (b?.watchedDate || "").localeCompare(a?.watchedDate || "")
    );
  }, [watchedReviews]);

  const watchedByYear = useMemo(() => {
    return watchedReviews.reduce((acc, item) => {
      const year = item?.watchedDate ? item.watchedDate.split("-")[0] : "Unknown";
      acc[year] = (acc[year] || 0) + 1;
      return acc;
    }, {});
  }, [watchedReviews]);

  const sortedYearStats = useMemo(
    () => Object.entries(watchedByYear).sort(([a], [b]) => b.localeCompare(a)),
    [watchedByYear]
  );

  const averageRating = useMemo(() => {
    if (!watchedReviews.length) return "0.0";
    const total = watchedReviews.reduce(
      (sum, item) => sum + Number(item?.rating || 0),
      0
    );
    return (total / watchedReviews.length).toFixed(1);
  }, [watchedReviews]);

  const thisYearCount = useMemo(() => {
    const currentYear = String(new Date().getFullYear());
    return watchedByYear[currentYear] || 0;
  }, [watchedByYear]);

  const watchedMoviesOnly = useMemo(
    () => watchedItems.filter((item) => getMediaType(item) === "movie"),
    [watchedItems]
  );
  const watchedShowsOnly = useMemo(
    () => watchedItems.filter((item) => getMediaType(item) === "show"),
    [watchedItems]
  );
  const favoriteMoviesOnly = useMemo(
    () => favoriteData.filter((item) => getMediaType(item) === "movie"),
    [favoriteData]
  );
  const favoriteShowsOnly = useMemo(
    () => favoriteData.filter((item) => getMediaType(item) === "show"),
    [favoriteData]
  );
  const watchLaterMoviesOnly = useMemo(
    () => watchLaterData.filter((item) => getMediaType(item) === "movie"),
    [watchLaterData]
  );
  const watchLaterShowsOnly = useMemo(
    () => watchLaterData.filter((item) => getMediaType(item) === "show"),
    [watchLaterData]
  );

  const showEpisodesTotal = useMemo(
    () =>
      watchedShowsOnly.reduce(
        (sum, item) => sum + Number(item?.episodesWatched || 0),
        0
      ),
    [watchedShowsOnly]
  );
  const showMinutesTotal = useMemo(
    () =>
      watchedShowsOnly.reduce(
        (sum, item) => sum + Number(item?.totalWatchMinutes || 0),
        0
      ),
    [watchedShowsOnly]
  );

  const openMoviePopup = (item) => {
    const normalized = {
      ...item,
      id: item?.id || item?.movieId,
      title: item?.title || item?.name || "Untitled",
      poster_path: item?.poster_path || null,
      release_date: item?.release_date || null,
      overview: item?.overview || "Overview Not Available",
    };
    if (normalized?.id) {
      setActiveMovie(normalized);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-[#0f141a] pb-24 text-white"
      style={{
        background: "linear-gradient(180deg, #0f141a 0%, #121a22 45%, #0d1218 100%)",
      }}>
      <div className="hidden h-14 py-4 md:block">
        <Navbar />
      </div>

      <main className="mx-auto mt-5 w-full max-w-7xl space-y-5 px-4 pt-4 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-3xl border border-[#2f3c4d] bg-[#182028] p-5 md:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-1 text-xs uppercase tracking-[0.25em] text-slate-300">
                Film Diary
              </p>
              <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
                {userName ? `${userName}'s Letterbox` : "Your Letterbox"}
              </h1>
              <p className="mt-1 text-sm text-slate-300">
                Track what you watch, rate films and shows, and keep your list curated.
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-6">
            <div className="rounded-xl border border-[#3a4d63] bg-[#111921] p-4">
              <p className="text-xs text-slate-300">Watched</p>
              <p className="mt-1 text-2xl font-bold text-white">{watchedItems.length}</p>
            </div>
            <div className="rounded-xl border border-[#3a4d63] bg-[#111921] p-4">
              <p className="text-xs text-slate-300">Avg Rating</p>
              <p className="mt-1 text-2xl font-bold text-[#40bcf4]">{averageRating}</p>
            </div>
            <div className="rounded-xl border border-[#3a4d63] bg-[#111921] p-4">
              <p className="text-xs text-slate-300">This Year</p>
              <p className="mt-1 text-2xl font-bold text-[#00e054]">{thisYearCount}</p>
            </div>
            <div className="rounded-xl border border-[#3a4d63] bg-[#111921] p-4">
              <p className="text-xs text-slate-300">Watchlist</p>
              <p className="mt-1 text-2xl font-bold text-[#ff8000]">{watchLaterData.length}</p>
            </div>
            <div className="rounded-xl border border-[#3a4d63] bg-[#111921] p-4">
              <p className="text-xs text-slate-300">Show Episodes</p>
              <p className="mt-1 text-2xl font-bold text-[#d39bff]">{showEpisodesTotal}</p>
            </div>
            <div className="rounded-xl border border-[#3a4d63] bg-[#111921] p-4">
              <p className="text-xs text-slate-300">Show Watch Time</p>
              <p className="mt-1 text-2xl font-bold text-[#ffd166]">
                {(showMinutesTotal / 60).toFixed(1)}h
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-[#2f3c4d] bg-[#182028] p-4">
          <div className="mb-4 flex items-center gap-2">
            <IconCalendarStats className="text-[#40bcf4]" />
            <h2 className="text-lg font-bold text-white">Yearly Activity</h2>
          </div>
          {sortedYearStats.length ? (
            <div className="space-y-2">
              {sortedYearStats.map(([year, count]) => {
                const safeTotal = Math.max(1, watchedItems.length);
                const width = Math.max(10, Math.round((count / safeTotal) * 100));
                return (
                  <div key={year}>
                    <div className="mb-1 flex items-center justify-between text-xs text-slate-300">
                      <span>{year}</span>
                      <span>{count} titles</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#0f151c]">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-[#00e054] to-[#40bcf4]"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-slate-300">No watched history yet.</p>
          )}
        </section>

        <MediaGridSection
          title="Watched Movies"
          subtitle="Reviewed movie titles"
          items={watchedMoviesOnly}
          emptyText="No watched movies yet."
          showWatchedMeta
          onSelect={openMoviePopup}
        />
        <MediaGridSection
          title="Watched Shows"
          subtitle="Reviewed show titles with episodes tracked"
          items={watchedShowsOnly}
          emptyText="No watched shows yet."
          showWatchedMeta
          onSelect={openMoviePopup}
        />
        <MediaGridSection
          title="Favorite Movies"
          subtitle="Movies you loved"
          items={favoriteMoviesOnly}
          emptyText="No favorite movies yet."
          onSelect={openMoviePopup}
        />
        <MediaGridSection
          title="Favorite Shows"
          subtitle="Shows you loved"
          items={favoriteShowsOnly}
          emptyText="No favorite shows yet."
          onSelect={openMoviePopup}
        />
        <MediaGridSection
          title="Watch Later Movies"
          subtitle="Movies in your queue"
          items={watchLaterMoviesOnly}
          emptyText="No watch later movies."
          onSelect={openMoviePopup}
        />
        <MediaGridSection
          title="Watch Later Shows"
          subtitle="Shows in your queue"
          items={watchLaterShowsOnly}
          emptyText="No watch later shows."
          onSelect={openMoviePopup}
        />
      </main>

      {activeMovie ? (
        <PopOver
          onClose={() => setActiveMovie(null)}
          movie={activeMovie}
          id={activeMovie?.id}
          poster_path={activeMovie?.poster_path}
          title={activeMovie?.title || activeMovie?.name}
          overview={activeMovie?.overview}
          release_date={activeMovie?.release_date}
          genres={activeMovie?.genres}
        />
      ) : null}

      <div className="md:hidden">
        <NavbarBottom />
      </div>
    </div>
  );
};

export default Profile;
