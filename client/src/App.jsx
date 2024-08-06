import React from "react";
import Approuter from "./config/router";
import SocketProvider from "./providers/socket";
import PeerProvider from "./providers/peer";

function App() {
  return (
    <SocketProvider>
      <PeerProvider>
        <Approuter />
      </PeerProvider>
    </SocketProvider>
  );
}

export default App;
