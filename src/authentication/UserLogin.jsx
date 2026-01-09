import { useState, useEffect, useRef } from "react";
import Parse from "parse";
import "./Login.css";
import * as C from "../components";
import { returnOrgForAdminUser } from "../pages/CreateEvent/LoadOrganizationData";

export const UserLogin = ({ setCurrentUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const doUserLogin = async () => {
    try {
      const user = await Parse.User.logIn(username, password);

      if (!isMounted.current) return;

      const { orgId, orgName } = await returnOrgForAdminUser(user);

      if (orgName !== "Unknown organization") {
        localStorage.setItem(
          "organisation",
          JSON.stringify({ orgId, orgName })
        );
      }
      alert(`Welcome ${user.get("username")}`);
      setCurrentUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      if (isMounted.current) {
        alert(`Error! ${error.message}`);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    doUserLogin();
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
          <br />
          <br />
          <C.Button>Login</C.Button>
          <C.Button variant="secondary">Sign up</C.Button>
        </form>
      </div>
    </div>
  );
};
