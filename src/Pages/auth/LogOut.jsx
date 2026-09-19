import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../../context/AppContext";

export const useLogout = () => {
    const { setAuth, setInvoiceId, setUser } = useMyContext((state) => ({
        setAuth: state.setAuth,
        setInvoiceId: state.setInvoiceId,
        setUser: state.setUser,
    }));
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const logout = useCallback(() => {
        console.log("Logout Successfully");
        localStorage.clear();
        setAuth('');
        setUser(null);
        setInvoiceId(null);
        navigate('/home', { replace: true }); // redirect to home
    }, [navigate, setAuth, setInvoiceId, setUser]);

    return { logout, menuOpen, setMenuOpen };
};
