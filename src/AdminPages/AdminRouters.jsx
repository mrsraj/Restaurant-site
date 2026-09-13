import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Orders from "./AdminPages/Orders";
import Reservations from "./AdminPages/Reservations";
import Menu from "./AdminPages/Menu";
import Staff from "./Staff";
import Gallery from "./Gallery/Gallery";
import Settings from "./Settings/Settings";
import Workspace from "./Workspace";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
export default function AdminCollection() {
  return <ProtectedRoute allowedRoles={["super_admin", "restaurant_admin"]}><Workspace><Routes>
    <Route path="/admin/dashboard" element={<Dashboard />} />
    <Route path="/admin/staff" element={<Staff />} />
    <Route path="/admin/orders" element={<Orders />} />
    <Route path="/admin/menu" element={<Menu />} />
    <Route path="/admin/reservations" element={<Reservations />} />
    <Route path="/admin/gallery" element={<Gallery />} />
    <Route path="/admin/settings" element={<Settings />} />
    <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
  </Routes></Workspace></ProtectedRoute>;
}
