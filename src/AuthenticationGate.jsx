import { useEffect, useState } from "react";
import Parse from "parse";
import LoginPage from "./authentication/LoginPage.jsx";
import { AppRoutes } from "./Routes.jsx";

export default function AuthenticationGate() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const user = await Parse.User.current();
      setCurrentUser(user);
      setLoading(false);
    }
    checkUser();
  }, []);

  if (!currentUser) {
    return <LoginPage setCurrentUser={setCurrentUser} />;
  }

  return (
    <AppRoutes currentUser={currentUser} setCurrentUser={setCurrentUser} />
  );
}
