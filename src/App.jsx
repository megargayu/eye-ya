import { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import About from "./pages/About";
import FocusMode from "./pages/FocusMode";
import EyeExercises from "./pages/EyeExercises";

const App = () => {
  return (
    <div className="w-full h-full bg-[#121212] overflow-y-auto">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<About />} />
          <Route exact path="/focus" element={<FocusMode />} />
          <Route exact path="/exercises" element={<EyeExercises />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
