import { Navigate } from "react-router-dom";
import { useMyContext } from "../context/AppContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const user = localStorage.getItem('user');
    console.log("user = ", user);
    
    if (!user) return <Navigate to="/login" />;

    if (!allowedRoles.includes(user)) return <Navigate to="/" />;

    return children;
};

export default ProtectedRoute;
