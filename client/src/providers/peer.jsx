import { createContext, useMemo, useContext } from "react";

let PeerContext = createContext(null);

export const usePeer = () => {
  return useContext(PeerContext);
};

export default function PeerProvider(props) {
  let peer = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:global.stun.twilio.com:3478",
        ],
      },
    ],
  });

  let createOffer = () => {
    let offer = peer.createOffer();
    peer.setLocalDescription(offer);
    return offer;
  };

  let createAns = (offer) => {
    peer.setRemoteDescription(offer);
    let ans = peer.createAnswer();
    peer.setLocalDescription(ans);
    return ans;
  };

  return (
    <PeerContext.Provider value={{ peer, createOffer  , createAns}}>
      {props.children}
    </PeerContext.Provider>
  );
}
