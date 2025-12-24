import { useEffect, useState } from "react";
import OrderDetailsModal from "./OrderDetails";
import updateMenuStatus from "../../API/statusUpdate";
import GetAdminOrder from "../../API/GetAdminOrder";
import ModernLoader from "../../Common/ModernLoader";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loadingPage, setLoadingPage] = useState(false);
    const [loadingId, setLoadingId] = useState(null); // For per-button loader
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const statusStyles = {
        pending: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200",
        accepted: "bg-green-50 text-green-700 ring-1 ring-green-200",
        cancelled: "bg-red-50 text-red-700 ring-1 ring-red-200",
    };

    useEffect(() => {
        const fetchOrders = async () => {
            setLoadingPage(true);
            try {
                await GetAdminOrder(setOrders);
            } catch (err) {
                console.error("Error fetching orders:", err);
            } finally {
                setLoadingPage(false);
            }
        };

        fetchOrders();
    }, [refresh]);

    const updateOrderStatus = async (id, status) => {
        setLoadingId(id);
        try {
            await updateMenuStatus({ id, order_status: status });
            setRefresh(prev => !prev); // Refresh table
        } catch (err) {
            console.error("Failed to update order status:", err);
        } finally {
            setLoadingId(null);
        }
    };

    const updatePaymentStatus = async (id, status) => {
        setLoadingId(id);
        try {
            await updateMenuStatus({ id, payment_status: status });
            setRefresh(prev => !prev);
        } catch (err) {
            console.error("Failed to update payment status:", err);
        } finally {
            setLoadingId(null);
        }
    };

    const handleDetailsModal = (id) => {
        const orderData = orders.find(order => order.invoice_id === id);
        setSelectedOrder(orderData);
    };

    if (loadingPage) return <ModernLoader />;

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Orders Management</h1>
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm border">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-100 text-blue-600 font-bold">#</div>
                    <div className="leading-tight">
                        <p className="text-xs text-gray-500">Total Orders</p>
                        <p className="text-lg font-bold text-gray-800">{orders.length}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="max-h-[87vh] overflow-y-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 sticky top-0 z-10">
                            <tr className="text-gray-600 uppercase text-xs tracking-wider">
                                <th className="p-4 text-left">Invoice</th>
                                <th className="p-4 text-left">Customer</th>
                                <th className="p-4 text-center">No Items</th>
                                <th className="p-4 text-left">Status</th>
                                <th className="p-4 text-left">Payment</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-6 text-center text-gray-500">
                                        No orders found
                                    </td>
                                </tr>
                            ) : (
                                orders.map(order => (
                                    <tr key={order.invoice_id} className="hover:bg-gray-50 transition">
                                        <td className="p-4 font-medium text-gray-800">#{order.invoice_id}</td>
                                        <td className="p-4 text-gray-700">{order.username}</td>
                                        <td className="p-4 text-center font-semibold">{order.products?.length || 0}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
                                                ${statusStyles[order.order_status] || statusStyles.pending}`}>
                                                {order.order_status || "pending"}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            {order.payment_status === "paid" ? (
                                                <span className="text-green-600 font-semibold">● paid</span>
                                            ) : (
                                                <span className="text-red-600 font-semibold">● unpaid</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-center space-x-2 flex justify-center">
                                            <button
                                                onClick={() => handleDetailsModal(order.invoice_id)}
                                                className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
                                            >
                                                View
                                            </button>

                                            {/* Accept */}
                                            <button
                                                disabled={loadingId === order.invoice_id || ["accepted", "cancelled"].includes(order.order_status)}
                                                onClick={() => updateOrderStatus(order.invoice_id, "accepted")}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition
                                                    ${loadingId === order.invoice_id || ["accepted", "cancelled"].includes(order.order_status)
                                                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                        : "bg-green-600 text-white hover:bg-green-700"
                                                    }`}
                                            >
                                                {loadingId === order.invoice_id ? "⏳" : "Accept"}
                                            </button>

                                            {/* Reject */}
                                            <button
                                                disabled={
                                                    loadingId === order.invoice_id ||
                                                    order.order_status === "cancelled" ||
                                                    order.payment_status === "paid"
                                                }
                                                onClick={() => updateOrderStatus(order.invoice_id, "cancelled")}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition
                                                        ${loadingId === order.invoice_id ||
                                                        order.order_status === "cancelled" ||
                                                        order.payment_status === "paid"
                                                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                        : "bg-red-600 text-white hover:bg-red-700"
                                                    }`}
                                            >
                                                {loadingId === order.invoice_id ? "⏳" : "Reject"}
                                            </button>


                                            {/* Mark Paid */}
                                            <button
                                                disabled={loadingId === order.invoice_id || order.payment_status === "paid" || order.order_status !== "accepted"}
                                                onClick={() => updatePaymentStatus(order.invoice_id, "paid")}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition
                                                    ${loadingId === order.invoice_id || order.payment_status === "paid" || order.order_status !== "accepted"
                                                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                        : "bg-purple-600 text-white hover:bg-purple-700"
                                                    }`}
                                            >
                                                {loadingId === order.invoice_id ? "⏳" : "Mark Paid"}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {selectedOrder && (
                    <OrderDetailsModal
                        order={selectedOrder}
                        onClose={() => setSelectedOrder(null)}
                    />
                )}
            </div>
        </div>
    );
}
