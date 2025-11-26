import { useState } from "react";
import Parse from "parse";
import "./Login.css";
import { Button } from "../components/index";
import * as C from "../components/Input/MasterInput";

export const UserLogin = () => {
  // State variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const handleSubmit = function (event) {
    event.preventDefault();
    doUserLogin();
  };

  // Function that will return current user and also update current username
  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    // Update state variable holding current user
    setCurrentUser(currentUser);
    return currentUser;
  };

  const doUserLogin = async function () {
    const usernameValue = username;
    const passwordValue = password;

    try {
      const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
      alert(
        `Success! User ${loggedInUser.get(
          "username"
        )} has successfully logged in.`
      );
      const currentUser = await Parse.User.current();
      console.log(loggedInUser === currentUser);

      setUsername("");
      setPassword("");
      getCurrentUser();
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  return (
    <div className="login-container">
      <div className="logo-wrapper">
        <img src="src/assets/NEW_LOGO.svg" alt="ITU invited logo" />
      </div>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          {/* username */}
          <C.InputField
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            label="Username"
          />
          {/* password */}
          <C.InputField
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            label="Password"
            hasRightIcon
            rightIcon="visibility_off"
            placeholder="Password"
          />

          <Button>Login</Button>
        </form>
      </div>
    </div>
  );
};
