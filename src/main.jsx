import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { AppRoutes } from "./Routes.jsx";
import "./index.css";
import Parse from "./parseConfig.js";

ReactDOM.render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
  document.getElementById("root")
);
