import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TvShows from "./TvShows";
import React from "react";
import PlayTrailer from "./PlayTrailer";
import Profile from "./Profile";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/Browse",
      element: <Browse />,
    },
    {
      path: "/Shows",
      element: <TvShows />,
    },
    {
      path: "/PlayingTrailer/:name/:id",
      element: <PlayTrailer />,
    },
    {
      path: "/profile/:username/",
      element: <Profile />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
