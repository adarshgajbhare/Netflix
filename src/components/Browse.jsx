import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import Header from "./Header";
import {  signOut } from "firebase/auth";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
const Browse = () => {

  const user = useSelector(store=> store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const HandleSignOut =  () => {
    signOut(auth).then(() => {
      dispatch(removeUser())
      navigate("/")
    }).catch((error) => {
      console.log(error)
      navigate("/error")
    });
  }
  return (
    <div className="flex justify-between">
      <div>
        <Header />
      </div>
      { user && <div className="m-4  flex ">
        <h1>{user.displayName}</h1>
        <img
          className="w-9"
          src={user.photoURL}
        />
        <button onClick={HandleSignOut} className="font-bold text-black">Sign Out</button>
      </div>}
    </div>
  );
};
export default Browse;
