import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreateEvent } from "./pages/CreateEvent/CreateEvent.jsx";
import { Favorites } from "./pages/Favorites/Favorites.jsx";
import { MyEvents } from "./pages/MyEvents/MyEvents.jsx";
import { User } from "./pages/User/User.jsx";
import FrontPage from "./FrontPage.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";

export const AppRoutes = ({ currentUser, setCurrentUser }) => {
  console.log("AppRoutes currentUser:", currentUser.id, currentUser.get("username"));
  return (
    <BrowserRouter>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/createevent" element={<CreateEvent />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/myevents" element={<MyEvents />} />
        <Route path="/user" element={<User />} />
        <Route
          path="*"
          element={<h1>Page Not Found, try to reload the page</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
};
