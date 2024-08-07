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

  let createOffer = async () => {
    let offer = await peer.createOffer();
    peer.setLocalDescription(new RTCSessionDescription(offer));
    return offer;
  };

  let createAns = async (offer) => {
    peer.setRemoteDescription(offer);
    let ans = await peer.createAnswer();
    console.log("Peer Ans", ans);
    peer.setLocalDescription(new RTCSessionDescription(ans));
    return ans;
  };

  let setRemoteDescription = async (ans) => {
    await peer.setRemoteDescription(new RTCSessionDescription(ans));
  };

  return (
    <PeerContext.Provider
      value={{ peer, createOffer, createAns, setRemoteDescription }}
    >
      {props.children}
    </PeerContext.Provider>
  );
}
