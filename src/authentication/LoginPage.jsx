import "./Login.css";
import { UserLogin } from "./UserLogin";

export default function LoginPage({ setCurrentUser }) {
  return (
    <div className="login-page">
      <UserLogin setCurrentUser={setCurrentUser} />
    </div>
  );
}
