import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Store, Users, ShoppingBag, UtensilsCrossed, CalendarDays } from "lucide-react";
import { useMyContext } from "../../context/AppContext";
import { authRequest } from "../../services/api/api";
export default function Dashboard() {
  const { user, selectedRestaurantId } = useMyContext((state) => ({
    user: state.user,
    selectedRestaurantId: state.selectedRestaurantId,
  }));
  const system = user === "super_admin";
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true; setError(""); setData(null);
    const paths = system ? ["/restaurants", "/staff", "/orders"] : ["/orders", "/menu-items", "/reservations"];
    Promise.all(paths.map(path => authRequest("/api/v1" + path))).then(result => { if (active) setData(result); }).catch(e => { if (active) setError(e.message); });
    return () => { active = false; };
  }, [system, attempt, selectedRestaurantId]);
  const orders = data ? (system ? data[2] : data[0]) : [];
  const stats = system ? [
    ["Restaurants", data?.[0]?.length, "Across your organization", Store],
    ["Staff accounts", data?.[1]?.length, "Managers and kitchen staff", Users],
    ["Open orders", orders.filter(o => ["pending", "accepted", "preparing", "completed"].includes(o.order_status)).length, "Selected restaurant", ShoppingBag]
  ] : [
    ["Open orders", orders.filter(o => ["pending", "accepted", "preparing", "completed"].includes(o.order_status)).length, "Waiting or in preparation", ShoppingBag],
    ["Menu items", data?.[1]?.data?.length, "In your restaurant", UtensilsCrossed],
    ["Reservations", data?.[2]?.length, "All recorded bookings", CalendarDays]
  ];
  return <div className="ws-stack">
    <div className="ws-page-heading"><div><p className="ws-eyebrow">{system ? "THE BIG PICTURE" : "READY FOR SERVICE"}</p><h1>{system ? "Your restaurants, connected." : "A good service starts here."}</h1><p>{system ? "Manage your locations and people, then focus on the restaurant that needs you." : "Keep an eye on orders, your menu, and the guests coming through your doors."}</p></div><Link className="ws-button primary" to={system ? "/admin/staff" : "/admin/orders"}>{system ? "Manage restaurants" : "View orders"}<ArrowRight size={17} /></Link></div>
    {error ? <div className="ws-alert" role="alert">{error}<button className="ws-button" onClick={() => setAttempt(n => n + 1)}>Try again</button></div> : <div className="ws-stats">{stats.map(([label, value, hint, Icon]) => <article className="ws-stat" key={label}><div><span>{label}</span><Icon size={20} /></div><strong>{data ? value ?? 0 : "—"}</strong><p>{data ? hint : "Loading overview…"}</p></article>)}</div>}
    <div className="ws-dashboard-grid"><section className="ws-panel"><div className="ws-panel-heading"><div><h2>Orders needing attention</h2><p>{system ? "For the selected restaurant" : "Your current service queue"}</p></div><Link to="/admin/orders">View all <ArrowRight size={15} /></Link></div>
      {!data ? <div className="ws-empty">{error ? "Order summary unavailable." : "Loading orders…"}</div> : !orders.some(o => ["pending", "accepted", "preparing", "completed"].includes(o.order_status)) ? <div className="ws-empty"><ShoppingBag size={28} /><h3>All caught up</h3><p>New orders will appear here when they arrive.</p></div> : <div className="ws-order-list">{orders.filter(o => ["pending", "accepted", "preparing", "completed"].includes(o.order_status)).slice(0, 6).map(o => <Link to="/admin/orders" key={o.invoice_id}><span className="ws-order-number">#{o.invoice_id}</span><div><strong>{o.username}</strong><small>{o.products?.reduce((n, p) => n + Number(p.quantity), 0) || 0} items</small></div><span className={"ws-badge " + o.order_status}>{o.order_status === "pending" ? "New order" : o.order_status === "accepted" ? "Awaiting kitchen" : o.order_status === "completed" ? "Ready for delivery" : "Preparing"}</span><ArrowRight size={16} /></Link>)}</div>}
    </section><section className="ws-panel ws-quick"><p className="ws-eyebrow">MAKE IT HAPPEN</p><h2>{system ? "Build your team." : "Set your kitchen up."}</h2><p>{system ? "Add a restaurant and give each manager the access they need." : "Give kitchen staff a focused workspace to handle incoming orders."}</p><Link to="/admin/staff" className="ws-button primary">Manage {system ? "people" : "kitchen team"}<ArrowRight size={16} /></Link><hr /><Link to="/admin/menu">Review your menu<ArrowRight size={16} /></Link><Link to="/admin/reservations">Check reservations<ArrowRight size={16} /></Link></section></div>
  </div>;
}
