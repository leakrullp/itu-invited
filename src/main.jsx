import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { AppRoutes } from "./Routes.jsx";
import "./index.css";
import initializeAllParse from "./services/parseConfig.js";
import LoginGate from "./authentication/LoginPage.jsx";

initializeAllParse();

ReactDOM.render(
  <StrictMode>
    <LoginGate />
  </StrictMode>,
  document.getElementById("root")
);
