import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import micOn from "../../assets/icons/micOn.png";
import micOff from "../../assets/icons/micOff.png";
import videoOn from "../../assets/icons/videoOn.png";
import videoOff from "../../assets/icons/videoOff.png";
import callOff from "../../assets/icons/callOff.png";
import copyIcon from "../../assets/icons/copyIcon.png";
import styles from "./style.module.css";

function Room() {
  let location = useLocation();
  let { roomId } = location.state;
  console.log("================= ", roomId);
  const [toggles, setToggles] = useState({
    videoIcon: true,
    micIcon: false,
    callIcon: false,
  });

  const copyhandler = () => {
    navigator.clipboard.writeText(roomId);
  };

  console.log(toggles);
  return (
    <div className="p-5  bg-slate-950 text-white h-screen w-screen flex gap-2 flex-col  justify-center items-center">
      <div className="flex h-[75%] w-full">
        <div className="main-video w-[75%] h-full flex justify-center px-5 items-center">
          <Frame className="h-full" toggle={toggles} />
        </div>
        <div className="side-video w-[25%] relative flex justify-center items-center p-3">
          <div
            className={
              styles.stripGlass +
              " absolute w-full h-full top-0 left-0 rounded-lg"
            }
          />
          <Frame
            className="min-h-[150px]"
            profileFrame="h-[50px] w-[50px] text-xs"
            stripClass="text-xs h-[15%]"
            toggle={toggles}
            iconStyle="h-[12px] w-[12px]"
          />
        </div>
      </div>
      <div className="flex self-start w-full gap-5 items-center my-3">
        <div
          className={
            styles.stripGlass +
            " flex min-w-fit justify-between rounded-lg px-2 p-1"
          }
        >
          <p>{roomId ?? null}</p>
          <span
            className="flex justify-center items-center self-end border-s border-white/20 ms-2 ps-2 cursor-pointer"
            onClick={copyhandler}
          >
            <img src={copyIcon} className="h-[20px] w-20px mb-[2px]" />
          </span>
        </div>
        <hr className="w-full opacity-10 " />
      </div>
      <div
        className={
          styles.stripGlass +
          " mx-10  flex justify-center relative items-center h-15 w-full rounded-lg p-2"
        }
      >
        <div
          className={
            "absolute w-full h-full top-0 left-0 opacity-10 rounded-lg"
          }
        />
        <div className="flex gap-5 z-10 items-center">
          <Icon
            stateKey={"videoIcon"}
            state={toggles}
            setState={setToggles}
            onIcon={videoOff}
            offIcon={videoOn}
          />
          <Icon
            stateKey={"micIcon"}
            state={toggles}
            setState={setToggles}
            onIcon={micOff}
            offIcon={micOn}
          />
          <Icon
            stateKey={"callIcon"}
            state={toggles}
            setState={setToggles}
            onIcon={callOff}
            offIcon={callOff}
          />
        </div>
      </div>
    </div>
  );
}

function Frame(props) {
  let { className, profileFrame, stripClass, iconStyle, toggle } = props;
  return (
    <div
      className={`Frame relative border-[2px] border-white border-opacity-30 w-full overflow-hidden rounded-3xl flex justify-center items-center ${className} `}
    >
      {toggle?.videoIcon ? (
        <div className="relative h-full w-full">
          <div
            className={`${styles.stripvideoGlass} absolute w-full h-[10%] bottom-0 left-0 rounded-b-lg ${stripClass} `}
          />
          <div
            className={`px-3 flex items-center justify-between absolute w-full h-[10%] bottom-0 left-0 rounded-b-lg ${stripClass} `}
          >
            <p>Mubbashir</p>
            <p>
              <img
                src={toggle?.micIcon ? micOn : micOff}
                className={`h-[20px] w-[20px] ${iconStyle} `}
              />
            </p>
          </div>
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1532892939738-86e29515dc9e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col gap-3">
          <div
            className={`border-[3px] border-slate-300 border-opacity-30 w-[100px] h-[100px] rounded-full ${profileFrame} `}
          >
            <img src="" />
          </div>
          <p className="name font-semibold">Mubbashir</p>
        </div>
      )}
    </div>
  );
}

function Icon(props) {
  let { className, stateKey, state, setState, onIcon, offIcon } = props;
  className = state[stateKey]
    ? `icon rounded-full bg-stone-800 border-red-300 flex justify-center items-center ${className}`
    : `icon rounded-full bg-red-600 flex border-red-300  justify-center items-center ${className}`;
  return (
    <>
      <div
        onClick={(_) => setState({ ...state, [stateKey]: !state[stateKey] })}
        className={className}
      >
        <img
          src={state[stateKey] ? offIcon : onIcon}
          className="h-[50px] w-[50px] rounded-full p-[12px]"
        />
      </div>
    </>
  );
}
export default Room;
