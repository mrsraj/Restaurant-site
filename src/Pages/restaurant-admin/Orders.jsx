import { subscribeToOrders } from "../../services/realtime/orderUpdates";
import { useCallback, useEffect, useState } from "react";
import { authRequest } from "../../services/api/api";
import OrderDetailsModal from "../../components/orders/OrderDetailsModal";
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(null);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const refresh = useCallback(async () => { setOrders(await authRequest("/api/v1/orders")); }, []);
  useEffect(() => {
    refresh().catch(e => setError(e.message)).finally(() => setLoading(false));
    const unsubscribe = subscribeToOrders(() => refresh().catch(e => setError(e.message)));
    const timer = setInterval(() => refresh().catch(e => setError(e.message)), 30000);
    return () => { clearInterval(timer); unsubscribe(); };
  }, [refresh]);
  async function update(id, fields) {
    setBusy(id); setError("");
    try { await authRequest(`/api/v1/orders/${id}`, { method: "PATCH", body: JSON.stringify(fields) }); await refresh(); }
    catch (e) { setError(e.message); } finally { setBusy(null); }
  }
  return <div className="ws-stack">
    <div className="ws-page-heading"><div><p className="ws-eyebrow">RESTAURANT SERVICE</p><h1>Orders</h1><p>Accept new orders for the kitchen. Mark them delivered after the kitchen completes preparation.</p></div><button className="ws-button" onClick={() => refresh().catch(e => setError(e.message))}>Refresh orders</button></div>
    {error && <div className="ws-alert" role="alert">{error}</div>}
    <div className="ws-panel" style={{ overflowX: "auto" }}><table className="w-full text-sm text-left"><thead><tr className="border-b bg-slate-50"><th className="p-4">Order</th><th className="p-4">Customer</th><th className="p-4">Status</th><th className="p-4">Payment</th><th className="p-4">Actions</th></tr></thead>
      <tbody>{orders.map(order => <tr key={order.invoice_id} className="border-b"><td className="p-4">#{order.invoice_id}</td><td className="p-4">{order.username}</td><td className="p-4"><span className={"ws-badge " + order.order_status}>{order.order_status}</span></td><td className="p-4">{order.payment_status}</td><td className="p-4"><div className="flex flex-wrap gap-2">
        <button className="ws-button" onClick={() => setSelected(order)}>Details</button>
        {order.order_status === "pending" && <button className="ws-button primary" disabled={busy !== null} onClick={() => update(order.invoice_id, { order_status: "accepted" })}>Accept order</button>}
        {order.order_status === "completed" && <button className="ws-button primary" disabled={busy !== null} onClick={() => update(order.invoice_id, { order_status: "delivered" })}>Mark delivered</button>}
        {["pending", "accepted", "preparing", "completed"].includes(order.order_status) && order.payment_status !== "paid" && <button className="ws-button" disabled={busy !== null} onClick={() => update(order.invoice_id, { order_status: "cancelled" })}>Cancel</button>}
        {["accepted", "preparing", "completed", "delivered"].includes(order.order_status) && order.payment_status !== "paid" && <button className="ws-button" disabled={busy !== null} onClick={() => update(order.invoice_id, { payment_status: "paid" })}>Mark paid</button>}
        {busy === order.invoice_id && <span role="status">Updating…</span>}
      </div></td></tr>)}</tbody></table>{loading ? <div className="ws-empty" role="status">Loading orders…</div> : !orders.length && <div className="ws-empty">No orders yet.</div>}</div>
    {selected && <OrderDetailsModal order={selected} onClose={() => setSelected(null)} />}
  </div>;
}
