import React from "react";
import Approuter from "./config/router";
import SocketProvider from "./providers/socket";

function App() {
  return (
    <SocketProvider>
      <Approuter />
    </SocketProvider>
  );
}

export default App;
