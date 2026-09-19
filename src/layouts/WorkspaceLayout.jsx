import FixedHeader from "../components/common/FixedHeader";
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Store, Users, UtensilsCrossed, ShoppingBag, CalendarDays, ChefHat, LogOut, ArrowUpRight, Image, Settings } from "lucide-react";
import { useMyContext } from "../context/AppContext";
import RestaurantSelector from "../components/restaurants/RestaurantSelector";
import "../styles/workspace.css";
import { roleLabels } from "../config/roleLabels";
 
export default function Workspace({ children }) {
  const { user, setUser, setAuth, setInvoiceId } = useMyContext();
  const navigate = useNavigate();
  let session; try { session = JSON.parse(localStorage.getItem("user_info") || "{}"); } catch { session = {}; }
  const kitchen = user === "kitchen";
  const links = kitchen ? [["/kitchen/orders", "Order board", ChefHat]] : [
    ["/admin/dashboard", "Overview", LayoutDashboard],
    ["/admin/staff", user === "super_admin" ? "Restaurants & people" : "Kitchen team", user === "super_admin" ? Store : Users],
    ["/admin/orders", "Orders", ShoppingBag], ["/admin/menu", "Menu", UtensilsCrossed], ["/admin/reservations", "Reservations", CalendarDays], ["/admin/gallery", "Gallery", Image], ["/admin/settings", "Settings", Settings]
  ];
  function logout() {
    ["user", "user_info", "restaurant_id", "invoice_id"].forEach(key => localStorage.removeItem(key));
    setUser(null); setAuth(null); setInvoiceId(null); navigate("/login", { replace: true });
  }
  return <div className="workspace">
    <aside className="ws-sidebar">
      <div className="ws-brand"><span><UtensilsCrossed size={22} /></span><div>Restaurant<span className="ws-brand-sub">OPERATIONS</span></div></div>
      <p className="ws-nav-label">{kitchen ? "KITCHEN WORKSPACE" : user === "super_admin" ? "SYSTEM WORKSPACE" : "RESTAURANT WORKSPACE"}</p>
      <nav aria-label="Workspace navigation">{links.map(([to, label, Icon]) => <NavLink key={to} to={to} className={({ isActive }) => isActive ? "ws-nav active" : "ws-nav"}><Icon size={19} />{label}</NavLink>)}</nav>
      <div className="ws-sidebar-bottom"><div className="ws-access"><span className="ws-dot" />{roleLabels[user]} access</div></div>
    </aside>
    <div className="ws-main">
      <FixedHeader className="workspace-fixed-header"><header className="ws-topbar"><div><span className="ws-eyebrow">YOUR WORKSPACE</span><strong>{kitchen ? "Kitchen service" : user === "super_admin" ? "Restaurant control center" : "Restaurant operations"}</strong></div><div className="ws-profile"><button type="button" className="ws-button ws-header-logout" onClick={logout}><LogOut size={18} />Log out</button><span className="ws-role">{roleLabels[user]}</span><span className="ws-avatar" aria-hidden="true">{(session?.username || "R").slice(0, 1).toUpperCase()}</span><span className="ws-profile-name">{session?.username || "Your account"}</span></div></header></FixedHeader>
      {!kitchen && <RestaurantSelector />}
      <main className="ws-content">{children}</main>
      <footer className="ws-footer"><span>Restaurant Operations</span><span>{kitchen ? "A clear view of every order." : "Everything you need to keep service moving."}<ArrowUpRight size={14} /></span></footer>
    </div>
  </div>;
}
