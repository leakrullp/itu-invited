import { Link } from "react-router-dom";
import Button from "../Button/Button.jsx";
import "./Navbar.css";

function Navbar({ loggedIn, setLoggedIn }) {
  return (
    <nav className="Navbar">
      <h1>
        <Link to="/" className="logo-link">
          <img src="./src/assets/LOGO.svg" alt="Logo" className="Logo" />
        </Link>
      </h1>

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
              <img
                src={"src/assets/Data/profile_pic_JD_Vance.png"}
                alt="Profile"
                className="profile-pic"
              />
            </Button>
          </Link>

          <Link to="/login">
            <Button
              variant="tertiary"
              onClick={() => setLoggedIn((prev) => !prev)}
            >
              {loggedIn ? (
                <>
                  <span className="material-symbols-outlined">logout </span>
                  Log out
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">login </span>
                  Log in
                </>
              )}
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
