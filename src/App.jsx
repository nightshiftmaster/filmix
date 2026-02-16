import React, { useRef } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useAppScrollControls } from "./hooks/useAppScrollControls";

function App() {
  const mainRef = useRef(null);
  useAppScrollControls(mainRef);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main
        ref={mainRef}
        className="flex-1 min-h-0 overflow-auto pt-30 md:pt-24"
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
        </Routes>
        <Footer />
      </main>
    </div>
  );
}

export default App;
