// src/services/orderService.js

import { API_BASE_URL } from "../config/api";

export async function createOrder(orderData,token) {
    const res = await fetch(`${API_BASE_URL}/api/order/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(orderData),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to create order");
    }

    // Save invoice/order id
    if (data.invoice_id) {
        localStorage.setItem("invoice_id", data.invoice_id);
    }

    return data;
}
