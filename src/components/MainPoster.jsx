import { POSTER_URL } from "../utils/constant";

import Tilt from "react-vanilla-tilt";
// eslint-disable-next-line react/prop-types
const MainPoster = ({ title, poster_path, original_title }) => {
  return (
    <div className="p-5 ">
      <Tilt
        options={{
          scale: 1,
          glare: true,
          "max-glare": 0.5,
          "glare-prerender": true,
        }}
        style={{}}
      >
        <div className="img-container  relative rounded-xl overflow-hidden md:scale-75" >
          <div className="absolute inset-0  bg-gradient-to-t  opacity-75 from-black"></div>

          <div className="text-black  p-4 gap-2 flex items-center  absolute bottom-0 w-full md:p-8 md:gap-5">
            <div className=" flex-1 w-full ">
              <button className=" font-bold text-md rounded-sm btn px-3 py-2 w-full play  text-[#131313] bg-white md:px-10 md:py-8 md:text-3xl">
                <i className="fa-solid fa-play mr-2 text-xl md:text-3xl"></i> Play
              </button>
            </div>
            <div className="flex-1 w-full ">
              <button className="hover:bg-glass font-bold text-md rounded-sm btn px-3 py-2 w-full  my-list bg-[#131313] text-white md:px-10 md:py-8 md:text-3xl">
                <i className="fa-solid fa-plus mr-2 text-xl md:text-3xl"></i> My List
              </button>
            </div>
          </div>
          <img className="h-full w-full " src={POSTER_URL + poster_path} />
        </div>
      </Tilt>
    </div>
  );
};

export default MainPoster;
