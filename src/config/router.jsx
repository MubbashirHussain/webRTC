import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";

function Approuter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default Approuter;
