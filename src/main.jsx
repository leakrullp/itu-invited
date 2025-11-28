import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import initializeAllParse from "./services/parseConfig.js";
import AuthenticationGate from "./AuthenticationGate.jsx";

initializeAllParse();

ReactDOM.render(
  <StrictMode>
    <AuthenticationGate />
  </StrictMode>,
  document.getElementById("root")
);
