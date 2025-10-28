import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Createevent } from "./pages/Createevent.jsx";
import { Favorites } from "./pages/Favorites.jsx";
import { Myevents } from "./pages/Myevents.jsx";
import { User } from "./pages/User.jsx";
import App from "./App.jsx"; // front page
import Navbar from "./components/Navbar/Navbar.jsx";

export const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/createevent" element={<Createevent />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/myevents" element={<Myevents />} />
        <Route path="/user" element={<User />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};
