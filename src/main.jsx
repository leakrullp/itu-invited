import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { AppRoutes } from "./Routes.jsx";
import "./index.css";
import initializeAllParse from "./services/parseConfig.js";

initializeAllParse();

ReactDOM.render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
  document.getElementById("root")
);
