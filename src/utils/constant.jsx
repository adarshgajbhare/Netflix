export const generateRandomPageNumber = function () {
  return Math.floor(Math.random() * 10) + 1;
};

const pageNumber = generateRandomPageNumber();

// OTHER LINKS
export const NETFLIX_LOGO =
  "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const NETFLIX_BACKGROUND =
  "https://assets.nflxext.com/ffe/siteui/vlv3/4da5d2b1-1b22-498d-90c0-4d86701dffcc/98a1cb1e-5a1d-4b98-a46f-995272b632dd/IN-en-20240129-popsignuptwoweeks-perspective_alpha_website_large.jpg";

export const USER_ICON =
  "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117";

export const POSTER_URL = "https://image.tmdb.org/t/p/w500";

// MOVIES API
export const NOW_PLAYING_MOVIES_API = `https://api.themoviedb.org/3/movie/now_playing?page=${pageNumber}`;
export const POPULAR_MOVIES_API = `https://api.themoviedb.org/3/movie/popular?page=${pageNumber}`;
export const TOP_RATED_MOVIES_API = `https://api.themoviedb.org/3/movie/top_rated?page=${pageNumber}`;
export const UPCOMING_MOVIES_API = `https://api.themoviedb.org/3/movie/upcoming?page=${pageNumber}`;

// TV SHOWS
export const TOP_TV_SHOW = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${pageNumber}`;
export const ARRIVING_TODAY_SHOW = `https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=${pageNumber}'`;
export const ON_AIR_SHOW = `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=${pageNumber}`;
export const POPULAR_SHOW = `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${pageNumber}`;

export const SERIES_POSTER_URL =
  "https://api.themoviedb.org/3/tv/series_id/images";

// API OPTIONS
export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDg0MzBkZmVkMzBiMjY0Mzc2MjA5ZGUzYmVjZmE3YSIsInN1YiI6IjY1OWVhYzBlY2I3NWQxMDI1N2NlYzVlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZuX9pdyXKBs1vQfwBqp_ueK79OIHypPxNk5y_nOAZC0",
  },
};
