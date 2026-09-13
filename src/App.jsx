import React from "react";
import AppProvider, { useMyContext } from "./context/AppContext";
import { Toaster } from "react-hot-toast";

import { BrowserRouter } from "react-router-dom";
import AppContent from "./Router/AppRouter";
import AdminCollection from "./AdminPages/AdminRouters";


import Kitchen from "./AdminPages/Kitchen";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { Routes, Route, Navigate } from "react-router-dom";
function AppWrapper() {

  const { user, authLoading } = useMyContext();

  

  if (authLoading) return <p role="status">Checking session…</p>;
  return ( 
    <BrowserRouter>
      { user === "kitchen" ? (<Routes><Route path="/kitchen/orders" element={<ProtectedRoute allowedRoles={["kitchen"]}><Kitchen /></ProtectedRoute>} /><Route path="*" element={<Navigate to="/kitchen/orders" replace />} /></Routes>) : ["super_admin", "restaurant_admin"].includes(user) ? (
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
      <Toaster position="top-right" />
    </AppProvider>
  );
}
