
function OrderDetailsModal({ order, onClose }) {
    if (!order) return null;

    const total = order.products.reduce(
        (sum, p) => sum + Number(p.line_total), 0);

    const statusStyle = {
        pending: "bg-yellow-50 text-yellow-700 ring-yellow-200",
        accepted: "bg-green-50 text-green-700 ring-green-200",
        rejected: "bg-red-50 text-red-700 ring-red-200",
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            {/* Modal */}
            <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl mx-4">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            Order Details
                        </h2>
                        <p className="text-sm text-gray-500">
                            Invoice #{order.invoice_id}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-xl"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    {/* Customer & Status */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className="text-sm text-gray-500">Customer</p>
                            <h3 className="text-lg font-semibold text-gray-800">
                                {order.username}
                            </h3>
                        </div>

                        <span
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold ring-1
                            ${statusStyle[order.status] || statusStyle.pending}`}
                        >
                            {order.status || "pending"}
                        </span>
                    </div>

                    {/* Products */}
                    <div className="border rounded-lg divide-y mb-6">
                        {order.products.map((item, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center p-4"
                            >
                                <div>
                                    <p className="font-medium text-gray-800">
                                        {item.product_name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Qty {item.quantity} × ₹{item.unit_price}
                                    </p>
                                </div>
                                <p className="font-semibold text-gray-800">
                                    ₹{item.line_total}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center text-lg font-bold border-t pt-4 mb-6">
                        <span>Total Amount</span>
                        <span>₹{order.total_amount}</span>
                    </div>

                    {/* Payment */}
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">
                                Payment Status
                            </p>
                            {order.payment_status === "paid" ? (
                                <span className="text-green-600 font-semibold">
                                    ● Paid
                                </span>
                            ) : (
                                <span className="text-red-600 font-semibold">
                                    ● Pending
                                </span>
                            )}
                        </div>

                        <div className="text-sm text-gray-500">
                            Order ID: #{order.invoice_id}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-300 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderDetailsModal;
