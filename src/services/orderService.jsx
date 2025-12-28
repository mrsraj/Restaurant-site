// src/services/orderService.js

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const userInfo = JSON.parse(localStorage.getItem("user_info"));
const token = userInfo?.token;

export async function createOrder(orderData) {
    const res = await fetch(`${API_BASE_URL}/order/orders`, {
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
