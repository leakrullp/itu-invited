import { useState } from "react";
import Parse from "parse";
import "./Login.css";
import { Button } from "../components/index";
import * as C from "../components/Input/MasterInput";

export const UserLogin = ({ setCurrentUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    doUserLogin();
  };

  const doUserLogin = async () => {
    try {
      const user = await Parse.User.logIn(username, password);

      alert(`Welcome ${user.get("username")}`);

      setCurrentUser(user);

      setUsername("");
      setPassword("");

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
          <C.InputField
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            label="Username"
          />

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
