import React from "react";

export const LogIn = ({ loggedIn, setLoggedIn }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function toggleLogin() {
    setLoggedIn((prev) => !prev);
  }

  return (
    <div>
      {loggedIn ? (
        <h3>Welcome back!</h3>
      ) : (
        <>
          <h3>Please log in</h3>

          <div>
            <form>
              <input
                type="email"
                placeholder="Enter email@itu.dk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </form>
          </div>
        </>
      )}

      <button onClick={toggleLogin}>{loggedIn ? "Log out" : "Log in"}</button>
    </div>
  );
};
