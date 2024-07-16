import React from "react";

function Room() {
  return (
    <div className="p-5  bg-slate-950 text-white h-screen w-screen flex gap-2 flex-col  justify-center items-center">
      <div className="flex  h-full w-full">
        <div className="main-video w-[75%] flex justify-center px-5 items-center">
          <Frame style="h-full" />
        </div>
        <div className="side-video w-[25%] relative flex justify-center items-center p-3">
          <div className="absolute w-full h-full top-0 left-0 bg-slate-100 opacity-[.05] rounded-lg" />
          <Frame
            style="min-h-[150px]"
            profileFrame="h-[50px] w-[50px] text-xs"
          />
        </div>
      </div>
      <hr className="w-full opacity-10 my-3 mx-5" />
      <div className="navigations mx-10  flex justify-center relative items-center h-[11%] w-full rounded-lg p-5">
        <div className="absolute w-full h-full top-0 left-0 bg-slate-300 opacity-10 rounded-lg" />
        <div className="flex gap-5 z-10">
          <div className="icon p-2 border rounded-full border-yellow-600">
            😁
          </div>
          <div className="icon p-2 border rounded-full border-yellow-600">
            😁
          </div>
          <div className="icon p-2 border rounded-full border-yellow-600">
            😁
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame(props) {
  return (
    <div
      className={`Frame border-[2px] border-white border-opacity-30 w-full rounded-3xl flex justify-center items-center ${props.style} `}
    >
      <div className="flex justify-center items-center flex-col gap-3">
        <div
          className={`border-[3px] border-slate-300 border-opacity-30 w-[100px] h-[100px] rounded-full ${props.profileFrame} `}
        >
          <img src="" />
        </div>
        <p className="name font-semibold">Mubbashir</p>
      </div>
    </div>
  );
}

export default Room;
