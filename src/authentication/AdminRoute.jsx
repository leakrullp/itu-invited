import { Navigate } from "react-router-dom";
import Parse from "parse";
import useIsAdmin from "../hooks/useIsAdmin";
import Loading from "../toasts/Loading";

export default function AdminRoute({ children }) {
  const user = Parse.User.current();
  const { loading, isAdmin } = useIsAdmin();

  if (!user) return <Navigate to="/login" replace />;
  if (loading) return <Loading text="Checking admin rights..." />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return children;
}
