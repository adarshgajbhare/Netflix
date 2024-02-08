import React from "react";

const PopOver = ({id}) => {
  return (
    <>
      <div className="card  flex h-[330px] w-[390px] flex-col overflow-hidden rounded-xl ">
        <div className="img flex-1 bg-red-500 overflow-hidden">
          <img
            className=" object-cover object-center aspect-square "
            src="https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>

        <div className="details flex-1 bg-[#16181f] p-4 flex flex-col gap-2">
          <div className="buttons flex w-full items-stretch gap-2">
            <button className="w-full grow rounded-md bg-white py-3 text-sm font-bold">
              Watch Now
            </button>
            <button className="rounded-md bg-white px-4 py-2 text-3xl font-semibold flex justify-center items-center">
              {" "}
              <p className="h-fit w-fit ">+</p>
            </button>
          </div>

          <div className="moveInfo flex h-full flex-col  text-white gap-2">
            <p className="title font-bold text-lg  ">Avengers Endgame</p>
            <p className=" overview text-[#7f87a4] text-sm  line-clamp-3 overflow-hidden w-full grow text-left pr-3">
              After Thanos, an intergalactic warlord, disintegrates half of the
              universe, the Avengers must reunite and assemble again to
              reinvigorate their trounced allies and restore balance.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopOver;
