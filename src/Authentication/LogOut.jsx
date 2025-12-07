import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../context/AppContext";

export const useLogout = () => {
    const { setAuth, setInvoiceId } = useMyContext();
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const logout = () => {
        console.log("Logout Successfully");
        localStorage.clear();
        setAuth('');
        setInvoiceId(null)
        navigate('/home', { replace: true }); // redirect to home
    };

    return { logout, menuOpen, setMenuOpen };
};
