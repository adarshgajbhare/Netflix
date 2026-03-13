import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { database } from "./firebase";

const USERS_COLLECTION = "Users";
const FRIEND_REQUESTS_COLLECTION = "FriendRequests";
const FRIENDS_COLLECTION = "Friends";

const normalizeText = (value = "") => value.trim().toLowerCase();

export const buildUserProfilePayload = (user) => ({
  uid: user?.uid || "",
  email: user?.email || "",
  emailLower: normalizeText(user?.email),
  displayName: user?.displayName || "Anonymous",
  displayNameLower: normalizeText(user?.displayName),
  username: user?.displayName || "anonymous",
  usernameLower: normalizeText(user?.displayName),
  photoURL: user?.photoURL || "",
});

export const syncUserProfile = async (user) => {
  if (!user?.uid) return;

  await setDoc(
    doc(database, USERS_COLLECTION, user.uid),
    {
      ...buildUserProfilePayload(user),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};

export const getUserProfileById = async (uid) => {
  if (!uid) return null;
  const snapshot = await getDoc(doc(database, USERS_COLLECTION, uid));
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
};

export const getAllUserProfiles = async () => {
  const snapshot = await getDocs(collection(database, USERS_COLLECTION));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
};

export const getFriendsForUser = async (uid) => {
  if (!uid) return [];

  const friendSnapshot = await getDocs(
    query(collection(database, FRIENDS_COLLECTION), where("users", "array-contains", uid))
  );

  const friendIds = friendSnapshot.docs
    .map((item) => item.data()?.users || [])
    .flat()
    .filter((item) => item && item !== uid);

  const uniqueFriendIds = Array.from(new Set(friendIds));

  const profileSnapshots = await Promise.all(
    uniqueFriendIds.map((friendId) => getDoc(doc(database, USERS_COLLECTION, friendId)))
  );

  return profileSnapshots
    .filter((item) => item.exists())
    .map((item) => ({ id: item.id, ...item.data() }));
};

export const getFriendRequestsForUser = async (uid) => {
  if (!uid) return { received: [], sent: [] };

  const [receivedSnapshot, sentSnapshot] = await Promise.all([
    getDocs(
      query(
        collection(database, FRIEND_REQUESTS_COLLECTION),
        where("toUid", "==", uid),
        where("status", "==", "pending")
      )
    ),
    getDocs(
      query(
        collection(database, FRIEND_REQUESTS_COLLECTION),
        where("fromUid", "==", uid),
        where("status", "==", "pending")
      )
    ),
  ]);

  return {
    received: receivedSnapshot.docs.map((item) => ({ id: item.id, ...item.data() })),
    sent: sentSnapshot.docs.map((item) => ({ id: item.id, ...item.data() })),
  };
};

const buildFriendshipId = (uidA, uidB) => [uidA, uidB].sort().join("_");

export const sendFriendRequest = async ({ fromUser, toUser }) => {
  if (!fromUser?.uid || !toUser?.uid || fromUser.uid === toUser.uid) return;

  const requestId = `${fromUser.uid}_${toUser.uid}`;
  await setDoc(
    doc(database, FRIEND_REQUESTS_COLLECTION, requestId),
    {
      fromUid: fromUser.uid,
      fromDisplayName: fromUser.displayName || "",
      fromEmail: fromUser.email || "",
      toUid: toUser.uid,
      toDisplayName: toUser.displayName || "",
      toEmail: toUser.email || "",
      status: "pending",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};

export const acceptFriendRequest = async (requestItem) => {
  if (!requestItem?.fromUid || !requestItem?.toUid) return;

  const friendshipId = buildFriendshipId(requestItem.fromUid, requestItem.toUid);

  await Promise.all([
    setDoc(
      doc(database, FRIENDS_COLLECTION, friendshipId),
      {
        users: [requestItem.fromUid, requestItem.toUid],
        createdAt: serverTimestamp(),
      },
      { merge: true }
    ),
    setDoc(
      doc(database, FRIEND_REQUESTS_COLLECTION, requestItem.id),
      {
        status: "accepted",
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    ),
  ]);
};

export const declineFriendRequest = async (requestId) => {
  if (!requestId) return;
  await deleteDoc(doc(database, FRIEND_REQUESTS_COLLECTION, requestId));
};

export const unfriendUser = async (uidA, uidB) => {
  if (!uidA || !uidB || uidA === uidB) return;

  const friendshipId = buildFriendshipId(uidA, uidB);
  const requestIds = [`${uidA}_${uidB}`, `${uidB}_${uidA}`];

  await Promise.all([
    deleteDoc(doc(database, FRIENDS_COLLECTION, friendshipId)),
    ...requestIds.map((requestId) =>
      deleteDoc(doc(database, FRIEND_REQUESTS_COLLECTION, requestId))
    ),
  ]);
};

export const areUsersFriends = async (uidA, uidB) => {
  if (!uidA || !uidB) return false;
  if (uidA === uidB) return true;

  const snapshot = await getDoc(doc(database, FRIENDS_COLLECTION, buildFriendshipId(uidA, uidB)));
  return snapshot.exists();
};

export const filterProfiles = (profiles, searchTerm, currentUid) => {
  const normalized = normalizeText(searchTerm);
  if (!normalized) {
    return [];
  }

  return profiles.filter((item) => {
    if (item.uid === currentUid) return false;

    return [item.displayName, item.username, item.email]
      .filter(Boolean)
      .some((value) => normalizeText(value).includes(normalized));
  });
};
