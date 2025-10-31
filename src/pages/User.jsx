import "./User.css";
import { Filter, Navbar, Entry, Button } from "../components";
import UserSettings from "../assets/Data/UserSettings";

const currentUserID = 1;

export const User = () => {
  // Find the user by ID
  const currentUser = UserSettings.find((user) => user.id === currentUserID);

  return (
    <>
      <user-container>
        <div className="user-container">
          <h1>User settings</h1>
          <h2>{currentUser.name}</h2>
          <img
            src={currentUser.picture}
            alt={currentUser.name}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "55%",
              objectFit: "cover",
            }}
          />
          <h3></h3> {/*random empty line to make more space */}
          <div className="user-info-line">
            <h3>Role:</h3>
            <p>{currentUser.role}</p>
          </div>
          <div className="user-info-line">
            <h3>Organization:</h3>
            <p>{currentUser.organisation}</p>
          </div>
          <div className="user-info-line">
            <h3>Email:</h3>
            <p>{currentUser.mail}</p>
          </div>
        </div>
        {/*Edit button */}
        <Button>Edit</Button>
      </user-container>
    </>
  );
};
