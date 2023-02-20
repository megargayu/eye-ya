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
      <h2 className="w-full text-xs text-center text-white mb-4">Made with ❤️ by Ayush Garg and Franklin Liu</h2>
    </div>
  );
};

export default App;
