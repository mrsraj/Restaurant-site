import { useEffect, useState, useCallback } from "react";
import { RefreshCw, ChefHat, Check, ArrowRight, Clock } from "lucide-react";
import { authRequest } from "../API/api";
import Workspace from "./Workspace";
export default function Kitchen() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updated, setUpdated] = useState(null);
  const [tab, setTab] = useState("active");
  const refresh = useCallback(async () => {
    const rows = await authRequest("/api/v1/orders"); setOrders(rows); setUpdated(new Date()); setError("");
  }, []);
  useEffect(() => {
    refresh().catch(e => setError(e.message)).finally(() => setLoading(false));
    const timer = setInterval(() => refresh().catch(e => setError(e.message)), 30000);
    return () => clearInterval(timer);
  }, [refresh]);
  async function update(id, status) {
    setBusy(id); setError("");
    try { await authRequest(`/api/v1/orders/${id}`, { method: "PATCH", body: JSON.stringify({ order_status: status }) }); await refresh(); }
    catch (e) { setError(e.message); } finally { setBusy(null); }
  }
  const counts = Object.fromEntries(["pending", "accepted", "delivered"].map(status => [status, orders.filter(o => o.order_status === status).length]));
  const visible = orders.filter(o => tab === "active" ? ["pending", "accepted"].includes(o.order_status) : o.order_status === "delivered");
  return <Workspace><div className="ws-stack">
    <div className="ws-page-heading"><div><p className="ws-eyebrow">READY FOR SERVICE</p><h1>Kitchen order board</h1><p>Every ticket, in one place. Accept new orders and keep service moving.</p></div><button className="ws-button" disabled={loading} onClick={() => { setLoading(true); refresh().catch(e => setError(e.message)).finally(() => setLoading(false)); }}><RefreshCw size={16} />Refresh</button></div>
    <div className="ws-stats">{[["New tickets", counts.pending, Clock], ["In preparation", counts.accepted, ChefHat], ["Delivered", counts.delivered, Check]].map(([label, count, Icon]) => <div className="ws-stat" key={label}><div><span>{label}</span><Icon size={21} /></div><strong>{loading ? "—" : count}</strong><p>{label === "Delivered" ? "Across recorded orders" : "Ready for your attention"}</p></div>)}</div>
    {error && <div className="ws-alert" role="alert">{error}</div>}
    <div className="ws-board-toolbar"><div className="ws-tabs" aria-label="Filter orders">{[["active", "Active tickets"], ["delivered", "Delivered"]].map(([value, label]) => <button key={value} aria-pressed={tab === value} className={tab === value ? "selected" : ""} onClick={() => setTab(value)}>{label}</button>)}</div><span className="ws-muted">{updated ? "Updated " + updated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + " · refreshes every 30s" : "Fetching tickets…"}</span></div>
    {loading && !updated ? <div className="ws-panel ws-empty" role="status">Loading kitchen orders…</div> : visible.length ? <div className="ws-tickets">{visible.map(order => <article className={"ws-ticket " + order.order_status} key={order.invoice_id}><div className="ws-ticket-top"><span className={"ws-badge " + order.order_status}>{order.order_status === "pending" ? "New ticket" : order.order_status === "accepted" ? "In preparation" : "Delivered"}</span><span>#{order.invoice_id}</span></div><h2>{order.username || "Guest"}</h2><div className="ws-ticket-items">{order.products?.map((p, i) => <div key={i}><strong>{p.quantity}</strong><span>{p.product_name}</span></div>)}</div>{order.order_status !== "delivered" ? <button className="ws-button primary" disabled={busy !== null} onClick={() => update(order.invoice_id, order.order_status === "pending" ? "accepted" : "delivered")}>{busy === order.invoice_id ? "Updating…" : order.order_status === "pending" ? "Accept order" : "Mark delivered"}<ArrowRight size={16} /></button> : <div className="ws-ticket-done"><Check size={16} />Service complete</div>}</article>)}</div> : <div className="ws-panel ws-empty"><ChefHat size={36} /><h2>{tab === "active" ? "A clear kitchen." : "No delivered orders yet"}</h2><p>{tab === "active" ? "New tickets will appear here automatically." : "Completed service will appear here."}</p></div>}
  </div></Workspace>;
}
