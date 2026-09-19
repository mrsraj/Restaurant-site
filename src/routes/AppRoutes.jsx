
import { useMyContext } from "../context/AppContext";
import AdminRoutes from "./AdminRoutes";
import KitchenRoutes from "./KitchenRoutes";
import CustomerRoutes from "./CustomerRoutes";

export default function AppRoutes() {
  const { user, authLoading } = useMyContext((state) => ({
    user: state.user,
    authLoading: state.authLoading,
  }));

  if (authLoading) {
    return <p role="status">Checking session…</p>;
  }

  if (user === "kitchen") {
    return <KitchenRoutes />;
  }

  if (["super_admin", "restaurant_admin"].includes(user)) {
    return <AdminRoutes />;
  }

  return <CustomerRoutes />;
}
