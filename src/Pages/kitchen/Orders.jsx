import { useCallback, useEffect, useState } from "react";
import {
  RefreshCw,
  ChefHat,
  Check,
  ArrowRight,
  Clock,
} from "lucide-react";

import { subscribeToOrders } from "../../services/realtime/orderUpdates";
import { authRequest } from "../../services/api/api";
import Workspace from "../../layouts/WorkspaceLayout";

export default function Kitchen() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updated, setUpdated] = useState(null);
  const [tab, setTab] = useState("active");

  const refresh = useCallback(async () => {
    const rows = await authRequest("/api/v1/orders");

    setOrders(rows);
    setUpdated(new Date());
    setError("");
  }, []);

  useEffect(() => {
    refresh()
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));

    const unsubscribe = subscribeToOrders(() =>
      refresh().catch((e) => setError(e.message))
    );

    const timer = setInterval(() => {
      refresh().catch((e) => setError(e.message));
    }, 30000);

    return () => {
      clearInterval(timer);
      unsubscribe();
    };
  }, [refresh]);

  async function update(id, status) {
    setBusy(id);
    setError("");

    try {
      await authRequest(`/api/v1/orders/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          order_status: status,
        }),
      });

      await refresh();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(null);
    }
  }

  const counts = Object.fromEntries(
    ["accepted", "preparing", "completed"].map((status) => [
      status,
      orders.filter((order) => order.order_status === status).length,
    ])
  );

  const visible = orders.filter((order) =>
    tab === "active"
      ? ["accepted", "preparing"].includes(order.order_status)
      : order.order_status === "completed"
  );

  return (
    <Workspace>
      <div className="ws-stack">
        {/* Page Heading */}
        <div className="ws-page-heading">
          <div>
            <p className="ws-eyebrow">READY FOR SERVICE</p>

            <h1>Kitchen order board</h1>

            <p>
              Every ticket, in one place. Only orders accepted by your
              restaurant admin appear here. Start preparation, then mark them
              completed.
            </p>
          </div>

          <button
            className="ws-button"
            disabled={loading}
            onClick={() => {
              setLoading(true);

              refresh()
                .catch((e) => setError(e.message))
                .finally(() => setLoading(false));
            }}
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        {/* Statistics */}
        <div className="ws-stats">
          {[
            ["Accepted tickets", counts.accepted, Clock],
            ["In preparation", counts.preparing, ChefHat],
            ["Completed", counts.completed, Check],
          ].map(([label, count, Icon]) => (
            <div className="ws-stat" key={label}>
              <div>
                <span>{label}</span>
                <Icon size={21} />
              </div>

              <strong>{loading ? "—" : count}</strong>

              <p>
                {label === "Completed"
                  ? "Across recorded orders"
                  : "Ready for your attention"}
              </p>
            </div>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="ws-alert" role="alert">
            {error}
          </div>
        )}

        {/* Toolbar */}
        <div className="ws-board-toolbar">
          <div className="ws-tabs" aria-label="Filter orders">
            {[
              ["active", "Active tickets"],
              ["completed", "Completed"],
            ].map(([value, label]) => (
              <button
                key={value}
                aria-pressed={tab === value}
                className={tab === value ? "selected" : ""}
                onClick={() => setTab(value)}
              >
                {label}
              </button>
            ))}
          </div>

          <span className="ws-muted">
            {updated
              ? `Updated ${updated.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })} · live updates · 30s fallback`
              : "Fetching tickets…"}
          </span>
        </div>

        {/* Loading */}
        {loading && !updated ? (
          <div className="ws-panel ws-empty" role="status">
            Loading kitchen orders…
          </div>
        ) : visible.length ? (
          /* Order Tickets */
          <div className="ws-tickets">
            {visible.map((order) => (
              <article
                className={`ws-ticket ${order.order_status}`}
                key={order.invoice_id}
              >
                <div className="ws-ticket-top">
                  <span className={`ws-badge ${order.order_status}`}>
                    {order.order_status === "accepted"
                      ? "Accepted"
                      : order.order_status === "preparing"
                        ? "In preparation"
                        : "Completed"}
                  </span>

                  <span>#{order.invoice_id}</span>
                </div>

                <h2>{order.username || "Guest"}</h2>

                {/* Order Items */}
                <div className="ws-ticket-items">
                  {order.products?.map((product, index) => (
                    <div key={index}>
                      <strong>{product.quantity}</strong>
                      <span>{product.product_name}</span>
                    </div>
                  ))}
                </div>

                {/* Order Action */}
                {order.order_status !== "completed" ? (
                  <button
                    className="ws-button primary"
                    disabled={busy !== null}
                    onClick={() =>
                      update(
                        order.invoice_id,
                        order.order_status === "accepted"
                          ? "preparing"
                          : "completed"
                      )
                    }
                  >
                    {busy === order.invoice_id
                      ? "Updating…"
                      : order.order_status === "accepted"
                        ? "Start preparing"
                        : "Mark completed"}

                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <div className="ws-ticket-done">
                    <Check size={16} />
                    Ready for delivery
                  </div>
                )}
              </article>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="ws-panel ws-empty">
            <ChefHat size={36} />

            <h2>
              {tab === "active"
                ? "A clear kitchen."
                : "No completed orders yet"}
            </h2>

            <p>
              {tab === "active"
                ? "Accepted tickets will appear here automatically."
                : "Completed service will appear here."}
            </p>
          </div>
        )}
      </div>
    </Workspace>
  );
}