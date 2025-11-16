import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const NotFound = () => {

    const navigate = useNavigate();

    // Redirect to home after some action (or immediately)
    React.useEffect(() => {
        navigate("/admin/dashboard", { replace: true });
    }, []);

};

export default NotFound;

