import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Createevent } from "./pages/Createevent.jsx";
import { Favorites } from "./pages/Favorites.jsx";
import { Myevents } from "./pages/Myevents.jsx";
import { User } from "./pages/User.jsx";
import App from "./App.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Parse from "./parseConfig.js";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/createevent" element={<Createevent />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/myevents" element={<Myevents />} />
        <Route path="/user" element={<User />} />
        <Route
          path="*"
          element={<h1>Page Not Found, try to reload the page</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
};
