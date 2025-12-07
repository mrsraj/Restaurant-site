// src/components/OrderStatusModal.jsx
import { useEffect, useState } from "react";

export default function OrderStatusModal({ invoiceId, open, onClose }) {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch order details
    useEffect(() => {
        if (!open || !invoiceId) return;

        const fetchOrder = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `http://localhost:3000/api/order/status/${invoiceId}`
                );
                const json = await res.json();

                if (json.success && json.data?.length > 0) {
                    setOrder(json.data[0]);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();

        // Auto-refresh every 5 seconds
        const interval = setInterval(fetchOrder, 5000);

        return () => clearInterval(interval);
    }, [open, invoiceId]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-5 relative animate-[fadeIn_0.2s]">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 text-lg"
                >
                    ✕
                </button>

                <h2 className="text-lg font-semibold text-slate-800 mb-3">
                    Order Status
                </h2>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-6 text-slate-500">
                        Loading order status...
                    </div>
                )}

                {/* Order Details */}
                {!loading && order && (
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-sm text-slate-500">Invoice ID</span>
                            <span className="font-medium">#{order.invoice_id}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-sm text-slate-500">Amount</span>
                            <span className="font-semibold">₹{order.total_amount}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-500">Status</span>

                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === "pending"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : order.status === "preparing"
                                            ? "bg-blue-100 text-blue-700"
                                            : order.status === "completed"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-slate-100 text-slate-700"
                                    }`}
                            >
                                {order.status}
                            </span>
                        </div>

                        <div className="flex justify-between text-xs text-slate-500 mt-2">
                            <span>Placed at</span>
                            <span>
                                {order.created_at
                                    ? new Date(order.created_at).toLocaleString()
                                    : "-"}
                            </span>
                        </div>

                        <p className="text-[10px] text-slate-400 mt-2 text-center">
                            Auto-updates every 5 seconds.
                        </p>
                    </div>
                )}

                {/* If no order found */}
                {!loading && !order && (
                    <div className="text-center py-6 text-slate-500">
                        Order not found.
                    </div>
                )}
            </div>
        </div>
    );
}
