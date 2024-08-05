import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../providers/socket";

function Home() {
  let socket = useSocket();
  let navigate = useNavigate();
  const [formData, setFromData] = useState({});

  let emailRef = useRef(null);
  let roomIdRef = useRef(null);

  let joinRoomBtnHandler = () => {
    let email = emailRef.current.value;
    let roomId = roomIdRef.current.value;
    console.log(email, roomId);
    if (email == "" || roomId == "" || email == " " || roomId == " ") {
      alert("email and RoomID is Required to Join Room");
    }

    socket.emit("join-room", { email, roomId });
  };
  const handleJoinedRoom = (data) => {
    navigate(`/room/${data.roomId}`, { state: { ...data } });
  };

  useEffect(() => {
    socket.on("joined-room", handleJoinedRoom);
    return () => {
      socket.off("joined-room", handleJoinedRoom);
    };
  }, [socket, handleJoinedRoom]);

  return (
    <div className=" h-screen w-screen flex justify-center items-center">
      <div className="card flex flex-col justify-between  min-h-[150px] p-2 min-w-[250px] max-h-[300px] max-w-[400px]  border rounded-md gap-2  ">
        <div className="flex flex-col p-1 gap-2">
          <h3 className=" font-semibold text-center text-xl"> Join Room </h3>
          <p className="text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            numquam maxime vel perferendis dolores cumque{" "}
          </p>
        </div>
        <input
          ref={emailRef}
          className="border text-sm p-2 rounded outline-none"
          type="email"
          placeholder="Enter your Email ID"
        />
        <input
          ref={roomIdRef}
          className="border text-sm p-2 rounded outline-none"
          placeholder="Enter Chat Room Id"
        />
        <button
          className="bg-blue-600 rounded  btn text-white font-semibold p-1"
          onClick={joinRoomBtnHandler}
        >
          Join
        </button>
      </div>
    </div>
  );
}

export default Home;
