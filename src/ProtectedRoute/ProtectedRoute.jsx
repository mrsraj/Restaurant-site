import { Navigate } from "react-router-dom";
import { useMyContext } from "../context/AppContext";
export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, authLoading } = useMyContext();
  if (authLoading) return <p role="status">Checking session…</p>;
  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user)) return <Navigate to={user === "kitchen" ? "/kitchen/orders" : "/"} replace />;
  return children;
}
