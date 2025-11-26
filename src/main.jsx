import { StrictMode, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import initializeAllParse from "./services/parseConfig.js";
import AuthenticationGate from "./AuthenticationGate.jsx";

initializeAllParse();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return <AppRoutes loggedIn={loggedIn} setLoggedIn={setLoggedIn} />;
}

ReactDOM.render(
  <StrictMode>
    <AuthenticationGate />
  </StrictMode>,
  document.getElementById("root")
);
