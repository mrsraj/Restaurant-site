import React from "react";
import AppProvider, { useMyContext } from "./context/AppContext";

import { BrowserRouter } from "react-router-dom";
import AppContent from "./Router/AppRouter";
import AdminCollection from "./AdminPages/AdminRouters";


function AppWrapper() {

  const { user } = useMyContext();
  console.log("User = ", user);
  

  return ( 
    <BrowserRouter>
      { user === "admin" ? (
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
