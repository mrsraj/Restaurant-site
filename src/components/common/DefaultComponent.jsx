import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useMyContext } from '../../context/AppContext';

const NotFound = () => {

    const navigate = useNavigate();
    const { user } = useMyContext();

    // Redirect to home after some action (or immediately)
    useEffect(() => {
        if (user.role === "admin") {
            navigate("/admin/dashboard", { replace: true });
        }
        else {
            navigate("/", { replace: true });
        }
    }, []);

};

export default NotFound;

