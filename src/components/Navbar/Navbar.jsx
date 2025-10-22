import React from "react";
import { FaHeart } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="Navbar">
      <h1> <img src="./src/assets/LOGO.svg" alt="Logo" className = "Logo" /> </h1>
      <ul className="nav-links">
        <li>My events</li>
        <li>Create events</li>
        <li><FaHeart color="#814684" /></li>
        <li>Profil</li>
      </ul>
    </nav>
  );
}

export default Navbar;
