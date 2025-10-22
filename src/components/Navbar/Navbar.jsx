import React from "react";
import Button from "../Button/Button.jsx";

function Navbar() {
  return (
    <nav className="Navbar">
      <h1>
        {" "}
        <img src="./src/assets/LOGO.svg" alt="Logo" className="Logo" />{" "}
      </h1>
      <ul className="nav-links">
        <li>My events</li>
        <li>Create events</li>
        <li>
        <Button variant="tertiary" icon="bookmark">Favorites</Button>
        </li>
        <li>Profil</li>
      </ul>
    </nav>
  );
}

export default Navbar;
