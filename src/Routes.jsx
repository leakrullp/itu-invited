import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Createevent } from "./pages/Createevent.jsx";
import { Favorites } from "./pages/Favorites.jsx";
import { Myevents } from "./pages/Myevents.jsx";
import { User } from "./pages/User.jsx";
import App from "./App.jsx"; // front page
import Navbar from "./components/Navbar/Navbar.jsx";
import { useState } from "react";
import { LogIn } from "./pages/LogIn.jsx";

export const AppRoutes = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <Router>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/createevent" element={<Createevent />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/myevents" element={<Myevents />} />
        <Route path="/user" element={<User />} />
        <Route
          path="/login"
          element={<LogIn loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        />
        <Route
          path="*"
          element={<h1>Page Not Found, try to reload the page</h1>}
        />
      </Routes>
    </Router>
  );
};
