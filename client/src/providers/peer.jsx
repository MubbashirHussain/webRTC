import { createContext, useMemo, useContext, useEffect, useState } from "react";
import { useSocket } from "./socket";

let PeerContext = createContext(null);

export const usePeer = () => {
  return useContext(PeerContext);
};

export default function PeerProvider(props) {
  const [remoteStream, setRemoteStream] = useState();
  let socket = useSocket();
  let peer = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  });

  let createOffer = async () => {
    let offer = await peer.createOffer({
      OfferToReceiveVideo: true,
      offerToReceiveAudio: true,
    });
    peer.setLocalDescription(offer);
    return offer;
  };

  let createAns = async (offer) => {
    // user 2
    peer.setRemoteDescription(offer);
    let ans = await peer.createAnswer();
    peer.setLocalDescription(ans);
    return ans;
  };

  let setRemoteDescription = async (ans) => {
    let Des = await peer.setRemoteDescription(ans);
    return Des;
  };
  let setIceCandidate = async (ice) => {
    let Des = await peer.addIceCandidate(new RTCIceCandidate(ice));
    // return Des;
  };

  useEffect(() => {
    console.log("PEER Track USE Effect ------------------ ");
    peer.addEventListener("track", function (ev) {
      console.log("i am on Tracks");
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
    socket.on("icecandidate", setIceCandidate);

    peer.onicecandidate = function (event) {
      if (event.candidate) {
        socket.emit("icecandidate", event.candidate);
      }
    };
    return () => {
      peer.ontrack = null;
    };
  }, []);
  return (
    <PeerContext.Provider
      value={{ peer, createOffer, createAns, setRemoteDescription }}
    >
      {props.children}
    </PeerContext.Provider>
  );
}
