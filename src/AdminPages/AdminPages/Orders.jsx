import React, { useState } from "react";

const Orders = () => {
    // Dummy orders data
    const [orders, setOrders] = useState([
        { id: 1, customer: "Rahul Kumar", item: "Paneer Butter Masala", price: 250, status: "Pending" },
        { id: 2, customer: "Sneha Singh", item: "Chicken Biryani", price: 320, status: "Pending" },
        { id: 3, customer: "Amit Patel", item: "Veg Burger", price: 150, status: "Pending" },
        { id: 4, customer: "Priya Sharma", item: "Cold Coffee", price: 120, status: "Pending" },
    ]);

    // Handle status change
    const handleAction = (id, action) => {
        setOrders((prev) =>
            prev.map((order) =>
                order.id === id ? { ...order, status: action } : order
            )
        );
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">🛒 Orders</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-xl shadow-md">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="py-3 px-4">Order ID</th>
                            <th className="py-3 px-4">Customer</th>
                            <th className="py-3 px-4">Item</th>
                            <th className="py-3 px-4">Price</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">{order.id}</td>
                                <td className="py-3 px-4">{order.customer}</td>
                                <td className="py-3 px-4">{order.item}</td>
                                <td className="py-3 px-4">₹ {order.price}</td>
                                <td
                                    className={`py-3 px-4 font-semibold ${order.status === "Accepted"
                                            ? "text-green-600"
                                            : order.status === "Declined"
                                                ? "text-red-600"
                                                : "text-yellow-600"
                                        }`}
                                >
                                    {order.status}
                                </td>
                                <td className="py-3 px-4 text-center space-x-2">
                                    <button
                                        onClick={() => handleAction(order.id, "Accepted")}
                                        className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleAction(order.id, "Declined")}
                                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    >
                                        Decline
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;
