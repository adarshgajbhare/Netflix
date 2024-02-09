/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable react/react-in-jsx-scope */
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "./Header";

import PopOver from "./PopOver";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "./Navbar";

const Profile = () => {
  const { username } = useParams();
  const watchList = useSelector((store) => store.savedInfo.watchLaterMovies);
  const favList = useSelector((store) => store.savedInfo.favoriteMovies);
  
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7.5,
    slidesToScroll: 2,
    initialSlide: 0,
    prevArrow: <Arrow2 />,
    nextArrow: <Arrow />,
  };
  function Arrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          overflow: "visible",
          marginTop: "60px",
          marginRight: "35px",
          scale: "2",
          zIndex: 999,
          paddingTop: "3rem",
          paddingBottom: "3.5rem",
          textAlign: "center",
          height: "fit-content",
          width: "fit-content",
          color: "red",
          background: "black",
          opacity: "0.5",
          borderBottomLeftRadius: "0.5rem",
          borderTopLeftRadius: "0.5rem",
        }}
        onClick={onClick}
      />
    );
  }

  function Arrow2(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          overflow: "visible",
          marginTop: "60px",
          marginLeft: "35px",
          scale: "2",
          zIndex: 999,
          paddingTop: "3rem",
          paddingBottom: "3.5rem",
          textAlign: "center",
          height: "fit-content",
          width: "fit-content",
          color: "red",
          background: "black",

          opacity: "0.5",
          borderBottomRightRadius: "0.5rem",
          borderTopRightRadius: "0.5rem",
        }}
        onClick={onClick}
      />
    );
  }
  
  return (
    <>
      <div className=" min-h-[100vh] bg-black w-full px-2 py-1">
        <div className="navbar  py-4">
          {/* <Header /> */}
          <Navbar/>
        </div>
        <div className="py-20 px-2 ">
          {/* <h1 className="text-white ">Hello there {username}</h1> */}
          <h1 className="text-white text-2xl">Watch Later</h1>
        </div>

        <div className=" h-[50vh] gap-3 relative  ">
        {/* <Slider {...settings} > */}
          {watchList && watchList.map((items) => (
            <div className="flex ">
              <PopOver
                movies={watchList}
                id={items?.id}
                poster_path={items?.poster_path}
                title={items?.title}
                overview={items?.overview}
                backdrop_path={items?.backdrop_path}
              />
            </div>
          ))}
          {/* </Slider> */}
        </div>
        <div className="px-2">
        
          <h1 className="text-white text-2xl">Favourite Movies </h1>
        </div>
        <div className=" h-[50vh] gap-3 flex ">
          {favList && favList.map((items) => (
            <div className="flex ">
              <PopOver
                movies={favList}
                id={items?.id}
                poster_path={items?.poster_path}
                title={items?.title}
                overview={items?.overview}
                backdrop_path={items?.backdrop_path}
              />
            </div>
          ))}
        </div>
      
      </div>
    </>
  );
};

export default Profile;
