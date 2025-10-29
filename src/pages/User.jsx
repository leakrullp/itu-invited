import { Filter, Navbar, Entry, Button } from "../components";
import UserSettings from "../assets/Data/UserSettings";

const currentUserID = 1;

export const User = () => {
  // Find the user by ID
  const currentUser = UserSettings.find((user) => user.id === currentUserID);

  return (
    <>
      <h1>User settings</h1>
      {
        <div>
          <h2>{currentUser.name}</h2>
          <img
            src={currentUser.picture}
            alt={currentUser.name}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <p>Role: {currentUser.role}</p>
          <p>Organization: {currentUser.organisation}</p>
          <p>Email: {currentUser.mail}</p>
        </div>
      }
    </>
  );
};
