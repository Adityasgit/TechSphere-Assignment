import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Favourite from "./pages/Favourite";
import Recently from "./pages/Recently";
import Top from "./pages/Top";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favourites" element={<Favourite />} />
        <Route path="/top" element={<Top />} />
        <Route path="/recently-played" element={<Recently />} />
      </Routes>
    </Router>
  );
}

export default App;
