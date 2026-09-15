import { createContext, useContext, useEffect, useState } from "react";
import { authRequest } from "../services/api/api";
export const AppContext = createContext();
export default function AppProvider({ children }) {
  const [reservations, setReservations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [Auth, setAuth] = useState(null);
  const [invoiceId, setInvoiceId] = useState(null);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    let active = true;
    if (!localStorage.getItem("user_info")) { setAuthLoading(false); return; }
    authRequest("/api/v1/users/me").then(data => {
      if (!active) return;
      const session = JSON.parse(localStorage.getItem("user_info") || "null");
      localStorage.setItem("user_info", JSON.stringify({ ...session, ...data }));
      localStorage.setItem("user", data.role);
      setUser(data.role); setAuth(data.role);
    }).catch(() => {
      if (!active) return;
      localStorage.removeItem("user"); localStorage.removeItem("user_info");
      setUser(null); setAuth(null);
    }).finally(() => { if (active) setAuthLoading(false); });
    return () => { active = false; };
  }, []);
  return <AppContext.Provider value={{
    reservations, messages,
    addReservation: value => setReservations(prev => [...prev, value]),
    addMessage: value => setMessages(prev => [...prev, value]),
    user, setUser, Auth, setAuth, invoiceId, setInvoiceId, authLoading
  }}>{children}</AppContext.Provider>;
}
export function useMyContext() { return useContext(AppContext); }
