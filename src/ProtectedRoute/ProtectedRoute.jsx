import { Navigate } from "react-router-dom";
import { useMyContext } from "../context/AppContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useMyContext();

    console.log("User = ", user);
    
    if (!user) return <Navigate to="/login" />;

    if (!allowedRoles.includes(user.role)) return <Navigate to="/" />;

    return children;
};

export default ProtectedRoute;
