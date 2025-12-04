import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../context/AppContext";

export const useLogout = () => {
    const { setAuth } = useMyContext();
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const logout = () => {
        console.log("Logout Successfully");
        localStorage.clear();
        setMenuOpen(false); // reset menu state
        setAuth('');
        navigate('/home', { replace: true }); // redirect to home
    };

    return { logout, menuOpen, setMenuOpen };
};
