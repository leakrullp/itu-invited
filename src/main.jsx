import { StrictMode, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import initializeAllParse from "./services/parseConfig.js";
import AuthenticationGate from "./authentication/AuthenticationGate.jsx";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

initializeAllParse();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return <AppRoutes loggedIn={loggedIn} setLoggedIn={setLoggedIn} />;
}

ReactDOM.render(
  <StrictMode>
    <AuthenticationGate />
    <ToastContainer/>  
  </StrictMode>,
  document.getElementById("root")
);
