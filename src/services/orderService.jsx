// src/services/orderService.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export async function createOrder(orderData) {
    const res = await fetch(`${API_BASE_URL}/order/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // Add auth if needed:
            // "Authorization": "Bearer " + token,
        },
        body: JSON.stringify(orderData),
    });

    const data = await res.json();
    localStorage.setItem("invoice_id", data.invoice_id);
    
    if (!res.ok) {
        throw new Error(data.message || "Failed to create order");
    }

    // For online methods, backend should return Razorpay order info here:
    // { razorpay_order_id, amount, currency, customer: {name,email,phone}, ... }
    return data;
}

export async function verifyPayment(payload) {
    const res = await fetch(`${API_BASE_URL}/api/payment/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Payment verification failed");
    }

    return data; // expect { success: true, ... }
}
