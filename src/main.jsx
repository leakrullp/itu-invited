// Summary: Entry point of the React app. It renders the main App component inside React.StrictMode for development checks.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Create the root element and render the App component inside StrictMode
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
