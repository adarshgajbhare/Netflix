import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { removeUser } from "../utils/userSlice";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";

const Browse = () => {
  useNowPlayingMovies();

  const dispatch = useDispatch();

  const user = useSelector((store) => store?.user);

  const HandleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="main-container relative w-full min-h-full overflow-x-hidden">
      <div className="absolute inset-0 -z-10   [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <div className="navbar z-50 bg-glass fixed w-full text-center flex justify-between items-center p-2">
        <img onClick={HandleSignOut} className="h-10" src={user?.photoURL} />
        <div className="">
          <Header />
        </div>
        <i className="fa-solid fa-magnifying-glass text-black text-3xl opacity-70"></i>
      </div>{" "}
      <MainContainer />
      <SecondaryContainer />{" "}
    </div>
  );
};
export default Browse;
