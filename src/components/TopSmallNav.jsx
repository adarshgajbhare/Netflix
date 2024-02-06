import { Link } from "react-router-dom"


const TopSmallNav = () => {
  return (
    <>
      <div className="text-white text-sm font-bold mt-20 z-50 flex items-center justify-around gap-2  2xl:hidden lg:hidden ">
        <Link to={"/Shows"}>
          <button className="flex-1 rounded-[100vw] border-2 py-2 px-2">
            Tv Shows
          </button>
        </Link>
        <Link to={"/browse"}>
          <button className="flex-1 rounded-[100vw] border-2 py-2 px-2  ">
            Movies
          </button>
        </Link>
        <Link to={"/"}>
          <button className="flex-1 rounded-[100vw] border-2 py-2 px-3  w-min-0">
            Categories
            <i className="fa-sharp fa-solid fa-chevron-down ml-2"></i>
          </button>
        </Link>
      </div>
    </>
  )
}

export default TopSmallNav
