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
        <li>
          <Button variant="tertiary">My events</Button>
        </li>
        <li>
          <Button variant="primary"> + Create events </Button>
        </li>
        <li>
          <Button variant="tertiary" icon="bookmark">
            Favorites
          </Button>
        </li>
        <li>
          <Button className="AccountButton" variant="tertiary">
            LP
          </Button>
        </li>
        <li>
          <Button variant="tertiary">Account</Button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
