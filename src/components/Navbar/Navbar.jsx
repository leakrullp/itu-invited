// Summary: Navigation bar that includes logo and multiple action buttons using the Button component.

import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button.jsx";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="Navbar">
      {/* App logo */}
      <h1>
        <img src="./src/assets/LOGO.svg" alt="Logo" className="Logo" />
      </h1>

      {/* Navigation buttons */}
      <ul className="nav-links">
        <li>
          <Link to="/myevents">
            <Button variant="tertiary">My events</Button>
          </Link>
        </li>

        <li>
          <Link to="/createevent">
            <Button variant="primary"> + Create events </Button>
          </Link>
        </li>

        <li>
          <Link to="/favorites">
            <Button variant="tertiary" icon="bookmark">
              Favorites
            </Button>
          </Link>
        </li>

        <li>
          <Link to="/user">
            <Button className="AccountButton" variant="tertiary">
              LP
            </Button>
          </Link>
        </li>
        <li>
          <Button variant="tertiary">Account@itu.dk</Button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
