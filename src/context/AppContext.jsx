import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
    const [reservations, setReservations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [Auth, setAuth] = useState(localStorage.getItem("user"));
    const [invoiceId, setInvoiceId] = useState(null);

    const [user, setUser] = useState(localStorage.getItem('user') || []);


    const addReservation = (reservation) => {
        setReservations((prev) => [...prev, reservation]);
    };

    const addMessage = (message) => {
        setMessages((prev) => [...prev, message]);
    };

    return (
        <AppContext.Provider value={
            {
                reservations, messages, addReservation, addMessage,
                user, setUser,
                Auth, setAuth,
                invoiceId, setInvoiceId
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
