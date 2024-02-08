/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useSelector } from "react-redux";
import MainPoster from "./MainPoster";
import React from "react";
const MainContainer = ({ title , original_name , poster_path, overview , id  }) => {

  return (
    <>
        <div className="mt-2 md:mt-0"> 
          <MainPoster
            title={title}
            poster_path={poster_path}
            original_title={original_name}
            id={id}
          />
        </div>
    </>
  );
};

export default MainContainer;
{
  /* <div className="mt-2 md:mt-0">
          <MainPoster
          
            title={show.title}
            poster_path={show.poster_path}
            original_title={show.name}
            id={show.id}
           
            showTitle={title}
            showPoster_path={poster_path}
            showOriginal_title={original_title}
            showId={id}
            onDataFromPage={handlePageData}
          />
        </div>
      ) : (
        <div className="mt-2 md:mt-0">
          <MainPoster
            title={title}
            poster_path={poster_path}
            original_title={original_title}
            id={id}
            showTitle={show.title}
            showPoster_path={show.poster_path}
            showOriginal_title={show.name}
            showId={show.id}
            onDataFromPage={handlePageData}
          />
        </div> */
}
