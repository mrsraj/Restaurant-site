import { Routes, Route, Navigate } from "react-router-dom";
import Orders from "../Pages/kitchen/Orders";
import ProtectedRoute from "./ProtectedRoute";
export default function KitchenRoutes() {
  return <ProtectedRoute allowedRoles={["kitchen"]}><Routes>
    <Route path="/kitchen/orders" element={<Orders />} />
    <Route path="*" element={<Navigate to="/kitchen/orders" replace />} />
  </Routes></ProtectedRoute>;
}
