import React from "react";

function Home() {
  return (
    <div className=" border border-red-600 h-screen w-screen flex justify-center items-center">
      <div className="card flex flex-col justify-between  min-h-[150px] p-2 min-w-[250px] max-h-[300px] max-w-[400px]  border rounded-md gap-2  ">
        <div className="flex flex-col p-1 gap-2">
          <h3 className=" font-semibold text-center text-xl"> Join Room </h3>
          <p className="text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus numquam maxime vel perferendis dolores cumque </p>
        </div>
        <input className="border text-sm p-2 rounded outline-none" type="email" placeholder="Enter your Email ID" />
        <input className="border text-sm p-2 rounded outline-none" placeholder="Enter Chat Room Id" />
        <button className="bg-blue-600 rounded  btn text-white font-semibold p-1">
          Join
        </button>
      </div>
    </div>
  );
}

export default Home;
