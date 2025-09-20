import AppProvider, { useMyContext } from "./context/AppContext";

import { BrowserRouter } from "react-router-dom";
import AppContent from "./Router/AppRouter";
import AdminCollection from "./AdminPages/AdminCollection";


function AppWrapper() {
  const { user } = useMyContext();

  return (
    <BrowserRouter>
      {user?.isAuthenticated && user.role === "admin1y" ? (
        <AdminCollection />
      ) : (
        <AppContent />
      )}
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppWrapper />
    </AppProvider>
  );
}
