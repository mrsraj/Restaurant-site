import { createContext, useContext, useState } from "react";
import menuData from "../data/menuData";

export const AppContext = createContext();

export default function AppProvider({ children }) {
    const [menu, setMenu] = useState(menuData);
    const [reservations, setReservations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [Auth, setAuth] = useState(() => localStorage.getItem("user"));

    const [user, setUser] = useState({
        isAuthenticated: true,   // change after login
        role: "admin",           // "admin" | "user"
    });


    const addReservation = (reservation) => {
        setReservations((prev) => [...prev, reservation]);
    };

    const addMessage = (message) => {
        setMessages((prev) => [...prev, message]);
    };

    return (
        <AppContext.Provider value={
            {
                menu, reservations, messages, addReservation, addMessage,
                user, setUser
            }
        }>
            {children}
        </AppContext.Provider>
    );
}

function useMyContext() {
    return useContext(AppContext);
}

export { useMyContext };
