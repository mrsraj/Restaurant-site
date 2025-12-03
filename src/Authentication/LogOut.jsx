import { useState } from "react";
import { useMyContext } from "../context/AppContext";

export const useLogout = () => {
    const { setAuth } = useMyContext();
    const [menuOpen, setMenuOpen] = useState(false);

    const logout = () => {
        console.log("Logout Successfully");
        localStorage.clear();
        setMenuOpen(!menuOpen);
        setAuth('');
    };

    return { logout, menuOpen, setMenuOpen };
};
