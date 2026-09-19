import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../Pages/restaurant-admin/Dashboard";
import Orders from "../Pages/restaurant-admin/Orders";
import Reservations from "../Pages/restaurant-admin/Reservations";
import Menu from "../Pages/restaurant-admin/Menu";
import RestaurantsAndStaff from "../Pages/super-admin/RestaurantsAndStaff";
import KitchenStaff from "../Pages/restaurant-admin/KitchenStaff";
import { useMyContext } from "../context/AppContext";
import Gallery from "../Pages/restaurant-admin/Gallery";
import Settings from "../Pages/restaurant-admin/Settings";
import Workspace from "../layouts/WorkspaceLayout";
import ProtectedRoute from "./ProtectedRoute";

export default function AdminRoutes() {
  const user = useMyContext((state) => state.user);

  return <ProtectedRoute allowedRoles={["super_admin", "restaurant_admin"]}><Workspace><Routes>
    <Route path="/admin/dashboard" element={<Dashboard />} />
    <Route path="/admin/staff" element={user === "super_admin" ? <RestaurantsAndStaff /> : <KitchenStaff />} />
    <Route path="/admin/orders" element={<Orders />} />
    <Route path="/admin/menu" element={<Menu />} />
    <Route path="/admin/reservations" element={<Reservations />} />
    <Route path="/admin/gallery" element={<Gallery />} />
    <Route path="/admin/settings" element={<Settings />} />
    <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
  </Routes></Workspace></ProtectedRoute>;
}
