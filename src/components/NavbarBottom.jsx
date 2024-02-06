import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const NavbarBottom = () => {
  const user = useSelector((store) => store?.user);
  return (
    <div className="navbar z-50 bg-glass fixed bottom-0  w-full text-center flex justify-between items-center py-4">
      <div className="flex-1">
        <Link to={"/Browse"}>
          {" "}
          <i className="fa-solid fa-house text-white text-3xl opacity-10"></i>{" "}
          <p className="text-white font-medium ">Home</p>
        </Link>
      </div>
      <div className="flex-1">
        <i className="fa-solid fa-magnifying-glass text-white opacity-10 text-3xl "></i>
        <p className="text-white font-medium ">Search</p>
      </div>
      <div className="flex-1">
        <div className="w-full">
          {" "}
          <img className="h-10 mx-auto" src={user?.photoURL} />
        </div>

        <p className="text-white font-medium w-min-0 text-ellipsis overflow-hidden ...">
          {user?.displayName}
        </p>
      </div>
    </div>
  );
};

export default NavbarBottom;
