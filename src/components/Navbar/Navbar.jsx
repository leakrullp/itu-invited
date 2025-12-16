import { Link } from "react-router-dom";
<<<<<<< Updated upstream
import Button from "../Button/Button.jsx";
=======
import { Button } from "../index";
import logo from "../../assets/NEW_LOGO.svg";
>>>>>>> Stashed changes
import "./Navbar.css";
import Parse from "parse";

function Navbar({ currentUser, setCurrentUser }) {
  return (
    <nav className="navbar">
      <h1>
        <Link to="/" className="logo-link">
          <img src={logo} alt="ITU Invited Logo" className="logo" />
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
            <Button variant="primary" icon="add">
              Create events
            </Button>
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
            <div className="account-pic">
              <img
                src={"src/assets/Data/profile_pic_JD_Vance.png"}
                alt="Profile"
                className="profile-pic"
              />
            </div>
          </Link>
        </li>

        <li>
          <Button
            variant="tertiary"
            icon={currentUser ? "Logout" : "Login"}
            onClick={async () => {
              if (currentUser) {
                await Parse.User.logOut();
                setCurrentUser(null);
              }
            }}
          >
            {currentUser ? "Log out" : "Log in"}
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
