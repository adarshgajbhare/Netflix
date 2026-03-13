/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
  IconCalendarStats,
  IconClockHour4,
  IconEye,
  IconSearch,
  IconUsers,
} from "@tabler/icons-react";
import Navbar from "./Navbar";
import NavbarBottom from "./NavbarBottom";
import PopOver from "./PopOver";
import { database } from "../utils/firebase";
import { POSTER_URL } from "../utils/constant";
import {
  acceptFriendRequest,
  areUsersFriends,
  declineFriendRequest,
  filterProfiles,
  getAllUserProfiles,
  getFriendRequestsForUser,
  getFriendsForUser,
  getUserProfileById,
  sendFriendRequest,
  syncUserProfile,
  unfriendUser,
} from "../utils/social";

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

const panelClassName =
  "rounded-[28px] border border-white/10 bg-[#12171d]/90 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur";

const StatCard = ({ label, value, accent }) => (
  <div className="rounded-[24px] border border-white/10 bg-[#0c1116] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
    <div
      className="mb-3 h-1.5 w-12 rounded-full"
      style={{
        background:
          accent || "linear-gradient(90deg, rgba(64,188,244,1) 0%, rgba(0,224,84,1) 100%)",
      }}
    />
    <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">{label}</p>
    <p className="mt-2 text-3xl font-black text-white">{value}</p>
  </div>
);

const SectionShell = ({ icon, title, subtitle, children, rightNode }) => (
  <section className={`${panelClassName} p-5 md:p-6`}>
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        <div className="mb-2 flex items-center gap-2 text-[#7dd3fc]">
          {icon}
          <h2 className="text-lg font-bold text-white">{title}</h2>
        </div>
        {subtitle ? <p className="text-sm text-slate-400">{subtitle}</p> : null}
      </div>
      {rightNode}
    </div>
    {children}
  </section>
);

const MediaGridSection = ({
  title,
  subtitle,
  items,
  emptyText,
  showWatchedMeta = false,
  onSelect,
}) => {
  return (
    <SectionShell
      icon={<IconCalendarStats size={18} />}
      title={title}
      subtitle={subtitle}
      rightNode={
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white">
          {items.length}
        </span>
      }>
      {items.length ? (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {items.map((item) => (
            <article
              key={`${item?.id || item?.movieId}-${title}`}
              onClick={() => onSelect(item)}
              className="group w-[118px] shrink-0 cursor-pointer overflow-hidden rounded-[20px] border border-white/10 bg-[#0d1218] transition duration-300 hover:-translate-y-1 hover:border-[#40bcf4]/50 sm:w-[130px]">
              <div className="relative aspect-[2/3] w-full overflow-hidden">
                {item?.poster_path ? (
                  <img
                    src={`${POSTER_URL}${item.poster_path}`}
                    alt={getTitle(item)}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-black/40 px-2 text-center text-xs text-slate-300">
                    No Poster
                  </div>
                )}
              </div>
              <div className="space-y-1 p-3">
                <p className="truncate text-xs font-semibold text-white">
                  {getTitle(item)}
                </p>
                {showWatchedMeta ? (
                  <>
                    <p className="text-[10px] text-slate-400">
                      {item?.watchedDate || "NA"}
                    </p>
                    {getMediaType(item) === "show" ? (
                      <p className="text-[10px] text-[#7dd3fc]">
                        {item?.episodesWatched || 0} ep |{" "}
                        {Math.round((item?.totalWatchMinutes || 0) / 60)}h
                      </p>
                    ) : (
                      <p className="text-[10px] text-[#7dd3fc]">
                        {item?.rating || 0}/5
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-[10px] text-slate-400">{getYear(item)}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-[22px] border border-dashed border-white/10 bg-[#0c1116] p-6 text-sm text-slate-400">
          {emptyText}
        </div>
      )}
    </SectionShell>
  );
};

const FriendCard = ({ profile, badges = [], actions = [] }) => (
  <article className="rounded-[22px] border border-white/10 bg-[#0c1116] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        {profile?.photoURL ? (
          <img
            src={profile.photoURL}
            alt={profile?.displayName || "profile"}
            className="h-14 w-14 rounded-2xl border border-white/10 object-cover"
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#17212b] text-base font-bold text-white">
            {(profile?.displayName || "?").slice(0, 1).toUpperCase()}
          </div>
        )}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-base font-semibold text-white">
              {profile?.displayName || "Unknown User"}
            </p>
            {badges.map((badge) => (
              <span
                key={badge.label}
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${badge.className}`}>
                {badge.label}
              </span>
            ))}
          </div>
          <p className="truncate text-sm text-slate-400">
            {profile?.email || "No email"}
          </p>
        </div>
      </div>
      {actions.length ? (
        <div className="flex flex-wrap gap-2">
          {actions.map((actionItem) => (
            <button
              key={actionItem.label}
              onClick={actionItem.onClick}
              disabled={actionItem.disabled}
              className={`rounded-full px-4 py-2 text-xs font-semibold text-white transition ${
                actionItem.className
              } ${actionItem.disabled ? "cursor-not-allowed opacity-70" : ""}`}>
              {actionItem.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  </article>
);

const Profile = () => {
  const { username: profileId } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector((store) => store.user);

  const [profileOwner, setProfileOwner] = useState(null);
  const [watchLaterData, setWatchLaterData] = useState([]);
  const [favoriteData, setFavoriteData] = useState([]);
  const [watchedReviews, setWatchedReviews] = useState([]);
  const [activeMovie, setActiveMovie] = useState(null);
  const [friends, setFriends] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [userDirectory, setUserDirectory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [socialLoading, setSocialLoading] = useState(true);
  const [isFriendViewer, setIsFriendViewer] = useState(false);
  const [socialMessage, setSocialMessage] = useState("");

  const isOwnProfile = !profileOwner?.uid || profileOwner.uid === currentUser?.uid;

  const loadSocialState = useCallback(
    async (targetProfile) => {
      if (!currentUser?.uid) return;

      const [directory, friendList, requests] = await Promise.all([
        getAllUserProfiles(),
        getFriendsForUser(currentUser.uid),
        getFriendRequestsForUser(currentUser.uid),
      ]);

      setUserDirectory(directory);
      setFriends(friendList);
      setReceivedRequests(requests.received);
      setSentRequests(requests.sent);

      const canViewFriendProfile = targetProfile?.uid
        ? await areUsersFriends(currentUser.uid, targetProfile.uid)
        : false;
      setIsFriendViewer(canViewFriendProfile);
    },
    [currentUser?.uid]
  );

  const loadProfileData = useCallback(async () => {
    if (!currentUser?.uid) return;

    setLoading(true);
    setSocialLoading(true);

    try {
      await syncUserProfile(currentUser);

      const targetProfile =
        currentUser?.uid === profileId || !profileId
          ? await getUserProfileById(currentUser.uid)
          : await getUserProfileById(profileId);

      if (!targetProfile) {
        setProfileOwner(null);
        setWatchLaterData([]);
        setFavoriteData([]);
        setWatchedReviews([]);
        setLoading(false);
        setSocialLoading(false);
        return;
      }

      setProfileOwner(targetProfile);
      await loadSocialState(targetProfile);

      const allowedToView =
        targetProfile.uid === currentUser.uid ||
        (await areUsersFriends(currentUser.uid, targetProfile.uid));

      if (!allowedToView) {
        setWatchLaterData([]);
        setFavoriteData([]);
        setWatchedReviews([]);
        return;
      }

      const watchLaterCollection = collection(database, "WatchLater");
      const favoriteCollection = collection(database, "Favorite");
      const watchedReviewsCollection = collection(database, "WatchedReviews");

      const [watchLaterSnapshot, favoriteSnapshot, watchedReviewsSnapshot] =
        await Promise.all([
          getDocs(
            query(watchLaterCollection, where("email", "==", targetProfile.email))
          ),
          getDocs(query(favoriteCollection, where("email", "==", targetProfile.email))),
          getDocs(
            query(watchedReviewsCollection, where("email", "==", targetProfile.email))
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
    } finally {
      setLoading(false);
      setSocialLoading(false);
    }
  }, [currentUser, loadSocialState, profileId]);

  useEffect(() => {
    loadProfileData();
  }, [loadProfileData]);

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

  const friendIds = useMemo(() => new Set(friends.map((item) => item.uid)), [friends]);
  const sentRequestIds = useMemo(
    () => new Set(sentRequests.map((item) => item.toUid)),
    [sentRequests]
  );
  const hasActiveSearch = searchTerm.trim().length > 0;

  const filteredProfiles = useMemo(
    () => filterProfiles(userDirectory, searchTerm, currentUser?.uid),
    [currentUser?.uid, searchTerm, userDirectory]
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
    if (normalized?.id) setActiveMovie(normalized);
  };

  const handleSendFriendRequest = async (targetUser) => {
    try {
      await sendFriendRequest({ fromUser: currentUser, toUser: targetUser });
      setSocialMessage(`Friend request sent to ${targetUser.displayName}.`);
      await loadProfileData();
    } catch (error) {
      console.error("Error sending friend request:", error);
      setSocialMessage("Failed to send friend request.");
    }
  };

  const handleAcceptRequest = async (requestItem) => {
    try {
      await acceptFriendRequest(requestItem);
      setSocialMessage(`You are now friends with ${requestItem.fromDisplayName}.`);
      await loadProfileData();
    } catch (error) {
      console.error("Error accepting friend request:", error);
      setSocialMessage("Failed to accept friend request.");
    }
  };

  const handleDeclineRequest = async (requestId) => {
    try {
      await declineFriendRequest(requestId);
      setSocialMessage("Friend request removed.");
      await loadProfileData();
    } catch (error) {
      console.error("Error declining friend request:", error);
      setSocialMessage("Failed to remove friend request.");
    }
  };

  const handleUnfriend = async (targetUid, targetName) => {
    try {
      await unfriendUser(currentUser?.uid, targetUid);
      setSocialMessage(`${targetName || "User"} removed from friends.`);
      await loadProfileData();

      if (profileOwner?.uid === targetUid) {
        navigate(`/profile/${currentUser?.uid}`);
      }
    } catch (error) {
      console.error("Error unfriending user:", error);
      setSocialMessage("Failed to remove friend.");
    }
  };

  const canViewProfileContent = isOwnProfile || isFriendViewer;

  const heroActions = !isOwnProfile
    ? friendIds.has(profileOwner?.uid)
      ? [
          {
            label: "View Profile",
            onClick: () => navigate(`/profile/${profileOwner?.uid}`),
            className: "bg-[#1a6fa4] hover:bg-[#2282bd]",
          },
          {
            label: "Unfriend",
            onClick: () =>
              handleUnfriend(profileOwner?.uid, profileOwner?.displayName),
            className: "bg-[#4d2024] hover:bg-[#643037]",
          },
        ]
      : sentRequestIds.has(profileOwner?.uid)
        ? [
            {
              label: "Request Sent",
              onClick: () => {},
              className: "bg-[#5e4a1d]",
              disabled: true,
            },
          ]
        : [
            {
              label: "Add Friend",
              onClick: () => handleSendFriendRequest(profileOwner),
              className: "bg-[#E50914] hover:bg-[#b20710]",
            },
          ]
    : [];

  return (
    <div
      className="min-h-screen w-full pb-24 text-white"
      style={{
        background:
          "radial-gradient(circle at top, rgba(64,188,244,0.12), transparent 24%), radial-gradient(circle at 80% 20%, rgba(229,9,20,0.14), transparent 18%), linear-gradient(180deg, #071018 0%, #0b1219 34%, #090e13 100%)",
      }}>
      <div className="hidden h-14 py-4 md:block">
        <Navbar />
      </div>

      <main className="mx-auto mt-5 w-full max-w-7xl space-y-6 px-4 pt-4 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0e151d]/95 p-6 shadow-[0_32px_120px_rgba(0,0,0,0.45)] md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(229,9,20,0.14),transparent_24%)]" />
          <div className="relative z-10 grid gap-6 lg:grid-cols-[1.3fr,0.9fr]">
            <div className="flex gap-4">
              {profileOwner?.photoURL ? (
                <img
                  src={profileOwner.photoURL}
                  alt={profileOwner?.displayName || "profile"}
                  className="h-20 w-20 shrink-0 rounded-[28px] border border-white/10 object-cover md:h-24 md:w-24"
                />
              ) : (
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[28px] border border-white/10 bg-[#17212b] text-3xl font-black text-white md:h-24 md:w-24">
                  {(profileOwner?.displayName || "?").slice(0, 1).toUpperCase()}
                </div>
              )}

              <div className="min-w-0">
                <p className="mb-2 text-[11px] uppercase tracking-[0.3em] text-[#7dd3fc]">
                  Private Social Profile
                </p>
                <h1 className="truncate text-3xl font-black tracking-tight text-white md:text-5xl">
                  {profileOwner?.displayName || "Profile"}
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
                  {isOwnProfile
                    ? "Search users, manage incoming requests, and decide who gets to see your watch space."
                    : canViewProfileContent
                      ? "You can browse this profile because the connection has been accepted."
                      : "This profile stays private until the friend request is accepted."}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {heroActions.map((actionItem) => (
                    <button
                      key={actionItem.label}
                      onClick={actionItem.onClick}
                      disabled={actionItem.disabled}
                      className={`rounded-full px-4 py-2.5 text-sm font-semibold text-white transition ${
                        actionItem.className
                      } ${actionItem.disabled ? "cursor-not-allowed opacity-75" : ""}`}>
                      {actionItem.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <StatCard label="Watched" value={watchedItems.length} />
              <StatCard label="Avg Rating" value={averageRating} accent="#40bcf4" />
              <StatCard label="This Year" value={thisYearCount} accent="#00e054" />
              <StatCard
                label="Friends"
                value={isOwnProfile ? friends.length : friendIds.has(profileOwner?.uid) ? 1 : 0}
                accent="#f97316"
              />
            </div>
          </div>

          {socialMessage ? (
            <div className="relative z-10 mt-6 rounded-[22px] border border-[#33556a] bg-[#111920] px-4 py-3 text-sm text-slate-200">
              {socialMessage}
            </div>
          ) : null}
        </section>

        {loading || socialLoading ? (
          <section className={`${panelClassName} p-6 text-sm text-slate-400`}>
            Loading profile...
          </section>
        ) : null}

        {!loading && !profileOwner ? (
          <section className={`${panelClassName} p-6 text-sm text-slate-400`}>
            Profile not found.
          </section>
        ) : null}

        {profileOwner ? (
          <section className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
            <div className="space-y-6">
              {isOwnProfile ? (
                <SectionShell
                  icon={<IconSearch size={18} />}
                  title="Find People"
                  subtitle="Search by name, username, or email. Results appear only after you start typing.">
                  <div className="rounded-[22px] border border-white/10 bg-[#0c1116] p-4">
                    <input
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      placeholder="Search by name, username, or email"
                      className="w-full rounded-2xl border border-white/10 bg-[#121a22] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#40bcf4]"
                    />
                  </div>

                  <div className="mt-4 grid gap-3">
                    {!hasActiveSearch ? (
                      <div className="rounded-[22px] border border-dashed border-white/10 bg-[#0c1116] p-6 text-sm text-slate-400">
                        Start typing to search for people.
                      </div>
                    ) : null}

                    {hasActiveSearch &&
                      filteredProfiles.slice(0, 8).map((item) => {
                        const isFriend = friendIds.has(item.uid);
                        const isPending = sentRequestIds.has(item.uid);

                        return (
                          <FriendCard
                            key={item.uid}
                            profile={item}
                            badges={
                              isFriend
                                ? [
                                    {
                                      label: "Friend",
                                      className: "bg-[#0e2a3e] text-[#7dd3fc]",
                                    },
                                  ]
                                : isPending
                                  ? [
                                      {
                                        label: "Pending",
                                        className: "bg-[#2e2410] text-[#facc15]",
                                      },
                                    ]
                                  : []
                            }
                            actions={
                              isFriend
                                ? [
                                    {
                                      label: "View Profile",
                                      onClick: () => navigate(`/profile/${item.uid}`),
                                      className: "bg-[#1a6fa4] hover:bg-[#2282bd]",
                                    },
                                    {
                                      label: "Unfriend",
                                      onClick: () => handleUnfriend(item.uid, item.displayName),
                                      className: "bg-[#4d2024] hover:bg-[#643037]",
                                    },
                                  ]
                                : [
                                    {
                                      label: isPending ? "Request Sent" : "Add Friend",
                                      onClick: isPending
                                        ? () => {}
                                        : () => handleSendFriendRequest(item),
                                      className: isPending
                                        ? "bg-[#5e4a1d]"
                                        : "bg-[#E50914] hover:bg-[#b20710]",
                                      disabled: isPending,
                                    },
                                  ]
                            }
                          />
                        );
                      })}

                    {hasActiveSearch && !filteredProfiles.length ? (
                      <div className="rounded-[22px] border border-dashed border-white/10 bg-[#0c1116] p-6 text-sm text-slate-400">
                        No matching users found.
                      </div>
                    ) : null}
                  </div>
                </SectionShell>
              ) : (
                <SectionShell
                  icon={<IconUsers size={18} />}
                  title="Connection"
                  subtitle="Friendship controls for this profile.">
                  <FriendCard
                    profile={profileOwner}
                    badges={
                      friendIds.has(profileOwner?.uid)
                        ? [{ label: "Friend", className: "bg-[#0e2a3e] text-[#7dd3fc]" }]
                        : sentRequestIds.has(profileOwner?.uid)
                          ? [{ label: "Pending", className: "bg-[#2e2410] text-[#facc15]" }]
                          : []
                    }
                    actions={
                      friendIds.has(profileOwner?.uid)
                        ? [
                            {
                              label: "View Profile",
                              onClick: () => navigate(`/profile/${profileOwner?.uid}`),
                              className: "bg-[#1a6fa4] hover:bg-[#2282bd]",
                            },
                            {
                              label: "Unfriend",
                              onClick: () =>
                                handleUnfriend(
                                  profileOwner?.uid,
                                  profileOwner?.displayName
                                ),
                              className: "bg-[#4d2024] hover:bg-[#643037]",
                            },
                          ]
                        : [
                            {
                              label: sentRequestIds.has(profileOwner?.uid)
                                ? "Request Sent"
                                : "Add Friend",
                              onClick: sentRequestIds.has(profileOwner?.uid)
                                ? () => {}
                                : () => handleSendFriendRequest(profileOwner),
                              className: sentRequestIds.has(profileOwner?.uid)
                                ? "bg-[#5e4a1d]"
                                : "bg-[#E50914] hover:bg-[#b20710]",
                              disabled: sentRequestIds.has(profileOwner?.uid),
                            },
                          ]
                    }
                  />

                  <div className="mt-4 rounded-[22px] border border-dashed border-white/10 bg-[#0c1116] p-6 text-sm text-slate-400">
                    {canViewProfileContent
                      ? "You already have access to this private profile."
                      : "Send a request first. Their profile unlocks after acceptance."}
                  </div>
                </SectionShell>
              )}

              {canViewProfileContent ? (
                <SectionShell
                  icon={<IconCalendarStats size={18} />}
                  title="Yearly Activity"
                  subtitle="A quick look at watch history by year.">
                  {sortedYearStats.length ? (
                    <div className="space-y-3">
                      {sortedYearStats.map(([year, count]) => {
                        const safeTotal = Math.max(1, watchedItems.length);
                        const width = Math.max(10, Math.round((count / safeTotal) * 100));
                        return (
                          <div key={year}>
                            <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                              <span>{year}</span>
                              <span>{count} titles</span>
                            </div>
                            <div className="h-3 rounded-full bg-[#0a0f14]">
                              <div
                                className="h-3 rounded-full bg-[linear-gradient(90deg,#00e054_0%,#40bcf4_65%,#f97316_100%)]"
                                style={{ width: `${width}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="rounded-[22px] border border-dashed border-white/10 bg-[#0c1116] p-6 text-sm text-slate-400">
                      No watched history yet.
                    </div>
                  )}
                </SectionShell>
              ) : null}
            </div>

            <div className="space-y-6">
              {isOwnProfile ? (
                <>
                  <SectionShell
                    icon={<IconClockHour4 size={18} />}
                    title="Requests"
                    subtitle="Incoming and outgoing friendship requests.">
                    <div className="space-y-3">
                      {receivedRequests.map((item) => (
                        <FriendCard
                          key={item.id}
                          profile={{
                            displayName: item.fromDisplayName,
                            email: item.fromEmail,
                          }}
                          badges={[{ label: "Incoming", className: "bg-[#11261a] text-[#86efac]" }]}
                          actions={[
                            {
                              label: "Accept",
                              onClick: () => handleAcceptRequest(item),
                              className: "bg-[#157347] hover:bg-[#1d9158]",
                            },
                            {
                              label: "Decline",
                              onClick: () => handleDeclineRequest(item.id),
                              className: "bg-[#4d2024] hover:bg-[#643037]",
                            },
                          ]}
                        />
                      ))}

                      {sentRequests.map((item) => (
                        <FriendCard
                          key={item.id}
                          profile={{
                            displayName: item.toDisplayName,
                            email: item.toEmail,
                          }}
                          badges={[{ label: "Pending", className: "bg-[#2e2410] text-[#facc15]" }]}
                        />
                      ))}

                      {!receivedRequests.length && !sentRequests.length ? (
                        <div className="rounded-[22px] border border-dashed border-white/10 bg-[#0c1116] p-6 text-sm text-slate-400">
                          No friend requests right now.
                        </div>
                      ) : null}
                    </div>
                  </SectionShell>

                  <SectionShell
                    icon={<IconUsers size={18} />}
                    title="Friends"
                    subtitle="Open a profile or remove the connection.">
                    <div className="space-y-3">
                      {friends.map((item) => (
                        <FriendCard
                          key={item.uid}
                          profile={item}
                          badges={[{ label: "Friend", className: "bg-[#0e2a3e] text-[#7dd3fc]" }]}
                          actions={[
                            {
                              label: "View Profile",
                              onClick: () => navigate(`/profile/${item.uid}`),
                              className: "bg-[#1a6fa4] hover:bg-[#2282bd]",
                            },
                            {
                              label: "Unfriend",
                              onClick: () => handleUnfriend(item.uid, item.displayName),
                              className: "bg-[#4d2024] hover:bg-[#643037]",
                            },
                          ]}
                        />
                      ))}

                      {!friends.length ? (
                        <div className="rounded-[22px] border border-dashed border-white/10 bg-[#0c1116] p-6 text-sm text-slate-400">
                          You do not have any friends yet.
                        </div>
                      ) : null}
                    </div>
                  </SectionShell>
                </>
              ) : (
                <SectionShell
                  icon={<IconEye size={18} />}
                  title="Profile Access"
                  subtitle="Only friends can see the sections below.">
                  <div className="rounded-[22px] border border-dashed border-white/10 bg-[#0c1116] p-6 text-sm text-slate-400">
                    {canViewProfileContent
                      ? "Access granted. This profile is visible because you are friends."
                      : "Access locked. Friendship is required before this profile becomes visible."}
                  </div>
                </SectionShell>
              )}

              <SectionShell
                icon={<IconUsers size={18} />}
                title="Watch Summary"
                subtitle="Snapshot of what is tracked on this profile.">
                <div className="grid grid-cols-2 gap-3">
                  <StatCard label="Watchlist" value={watchLaterData.length} accent="#f97316" />
                  <StatCard label="Favorites" value={favoriteData.length} accent="#e879f9" />
                  <StatCard label="Show Episodes" value={showEpisodesTotal} accent="#c084fc" />
                  <StatCard
                    label="Show Hours"
                    value={`${(showMinutesTotal / 60).toFixed(1)}h`}
                    accent="#facc15"
                  />
                </div>
              </SectionShell>
            </div>
          </section>
        ) : null}

        {!loading && profileOwner && !canViewProfileContent ? (
          <section className={`${panelClassName} p-6 text-sm text-slate-400`}>
            This account is private. Once the user accepts your friend request, the profile sections unlock here.
          </section>
        ) : null}

        {canViewProfileContent ? (
          <>
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
              subtitle={isOwnProfile ? "Movies you loved" : "Movies they loved"}
              items={favoriteMoviesOnly}
              emptyText="No favorite movies yet."
              onSelect={openMoviePopup}
            />
            <MediaGridSection
              title="Favorite Shows"
              subtitle={isOwnProfile ? "Shows you loved" : "Shows they loved"}
              items={favoriteShowsOnly}
              emptyText="No favorite shows yet."
              onSelect={openMoviePopup}
            />
            <MediaGridSection
              title="Watch Later Movies"
              subtitle={isOwnProfile ? "Movies in your queue" : "Movies in queue"}
              items={watchLaterMoviesOnly}
              emptyText="No watch later movies."
              onSelect={openMoviePopup}
            />
            <MediaGridSection
              title="Watch Later Shows"
              subtitle={isOwnProfile ? "Shows in your queue" : "Shows in queue"}
              items={watchLaterShowsOnly}
              emptyText="No watch later shows."
              onSelect={openMoviePopup}
            />
          </>
        ) : null}
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
