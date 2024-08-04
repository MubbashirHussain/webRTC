import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Room from "../pages/room";

function Approuter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:id" element={<Room />} />
      </Routes>
    </>
  );
}

export default Approuter;
