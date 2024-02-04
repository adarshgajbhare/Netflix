/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";

const BackgroundVideo = ({ title, id }) => {
  const video = useSelector((store) => store?.movies?.trailerVideo);


  return (
     <div className="2xl:visible"> </div>
    //   <iframe
    //     width="560"
    //     height="315"
    //     src={"https://www.youtube.com/embed/" + video?.key + ""}
    //     title="YouTube video player"
    //     frameBorder="0"
    //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    //     allowfullScreen
    //   ></iframe>
    
  );
};

export default BackgroundVideo;
