/* eslint-disable no-unused-vars */
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

 export const BASE_URL = "https://api.themoviedb.org/3/"

// MOVIES API
export const NOW_PLAYING_MOVIES_API = `${BASE_URL}movie/now_playing?page=${pageNumber}`;
export const POPULAR_MOVIES_API = `${BASE_URL}movie/popular?page=${pageNumber}`;
export const TOP_RATED_MOVIES_API = `${BASE_URL}movie/top_rated?page=${pageNumber}`;
export const UPCOMING_MOVIES_API = `${BASE_URL}movie/upcoming?page=${pageNumber}`;

// TV SHOWS
export const TOP_TV_SHOW = `${BASE_URL}tv/top_rated?&page=${pageNumber}`;
export const ARRIVING_TODAY_SHOW = `${BASE_URL}tv/airing_today?&page=${pageNumber}`;
export const ON_AIR_SHOW = `${BASE_URL}tv/on_the_air?&page=${pageNumber}`;
export const POPULAR_SHOW = `${BASE_URL}tv/popular?&page=${pageNumber}`;

export const SERIES_POSTER_URL =
  `${BASE_URL}tv/series_id/images`;

// API OPTIONS
export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDg0MzBkZmVkMzBiMjY0Mzc2MjA5ZGUzYmVjZmE3YSIsInN1YiI6IjY1OWVhYzBlY2I3NWQxMDI1N2NlYzVlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZuX9pdyXKBs1vQfwBqp_ueK79OIHypPxNk5y_nOAZC0",
  },
};

// Search API's
export const SEARCH_SHOW = `${BASE_URL}search/tv?query=dark&include_adult=false&language=en-US&page=1`;

export const SEARCH_MOVIES = `${BASE_URL}search/movie?query=dark&include_adult=false&language=en-US&page=1`;


// Genre API
export const MOVIE_GENRE = `${BASE_URL}genre/movie/list?language=en`;

export const SHOW_GENRE = `${BASE_URL}genre/tv/list?language=en`;

// Genre list

const MOVIE_GENRE_LIST = [
  {
    genres: [
      {
        id: 28,
        name: "Action",
      },
      {
        id: 12,
        name: "Adventure",
      },
      {
        id: 16,
        name: "Animation",
      },
      {
        id: 35,
        name: "Comedy",
      },
      {
        id: 80,
        name: "Crime",
      },
      {
        id: 99,
        name: "Documentary",
      },
      {
        id: 18,
        name: "Drama",
      },
      {
        id: 10751,
        name: "Family",
      },
      {
        id: 14,
        name: "Fantasy",
      },
      {
        id: 36,
        name: "History",
      },
      {
        id: 27,
        name: "Horror",
      },
      {
        id: 10402,
        name: "Music",
      },
      {
        id: 9648,
        name: "Mystery",
      },
      {
        id: 10749,
        name: "Romance",
      },
      {
        id: 878,
        name: "Science Fiction",
      },
      {
        id: 10770,
        name: "TV Movie",
      },
      {
        id: 53,
        name: "Thriller",
      },
      {
        id: 10752,
        name: "War",
      },
      {
        id: 37,
        name: "Western",
      },
    ],
  },
];

const showGenre_LIST = [
  {
    genres: [
      {
        id: 10759,
        name: "Action & Adventure",
      },
      {
        id: 16,
        name: "Animation",
      },
      {
        id: 35,
        name: "Comedy",
      },
      {
        id: 80,
        name: "Crime",
      },
      {
        id: 99,
        name: "Documentary",
      },
      {
        id: 18,
        name: "Drama",
      },
      {
        id: 10751,
        name: "Family",
      },
      {
        id: 10762,
        name: "Kids",
      },
      {
        id: 9648,
        name: "Mystery",
      },
      {
        id: 10763,
        name: "News",
      },
      {
        id: 10764,
        name: "Reality",
      },
      {
        id: 10765,
        name: "Sci-Fi & Fantasy",
      },
      {
        id: 10766,
        name: "Soap",
      },
      {
        id: 10767,
        name: "Talk",
      },
      {
        id: 10768,
        name: "War & Politics",
      },
      {
        id: 37,
        name: "Western",
      },
    ],
  },
];


//Recommendation 

const     REC_API = `https://api.themoviedb.org/3/movie/movie_id/recommendations?language=en-US&page=1'`