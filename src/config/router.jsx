import { Routes, Route } from "react-router-dom";

function Approuter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<>Home</>} />
        <Route path="/admin/*" element={<>admin</>} />
      </Routes>
    </>
  );
}

export default Approuter;
