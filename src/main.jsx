import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRoutes } from "./Routes.jsx";
import "./index.css";
// **Important** to use the minified version
import Parse from "parse";

//javascriptKey is required only if you have it on server.
Parse.initialize(
  "YsjXEUYnz2m6YGZvzfqAtvsJFLcpge44m7kl7hDP",
  "gzXItqBZFqkyaObjF7WW1sa0DRTlKXgnwHbESIbu"
);
Parse.serverURL = "https://parseapi.back4app.com/";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>
);
