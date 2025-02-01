import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import BoardPage from "./pages/BoardPage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Router basename="/imageboard">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:boardName" element={<BoardPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}