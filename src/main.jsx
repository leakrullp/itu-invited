import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { AppRoutes } from "./Routes.jsx";
import "./index.css";
import initializeAllParse from "./parseConfig.js";

initializeAllParse();

ReactDOM.render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
  document.getElementById("root")
);
