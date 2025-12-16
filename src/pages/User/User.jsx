import "./User.css";
import { Button } from "../../components";
import UserSettings from "./UserSettings";

const currentUserID = 1; // Hardcoded for now

export const User = () => {
  const currentUser = UserSettings.find((user) => user.id === currentUserID);

  return (
    <>
      <user-container>
        <div className="user-container">
          <h1>User settings</h1>
          <h2>{currentUser.name}</h2>
          <img
            className="user-profile-pic"
            src={currentUser.picture}
            alt={currentUser.name}
          />
          <br />
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
        <Button>Edit</Button>
      </user-container>
    </>
  );
};
