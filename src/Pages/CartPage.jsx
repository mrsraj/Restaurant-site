// src/components/CartPage.jsx
import React, { useEffect, useState } from "react";
import { createOrder } from "../services/orderService";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../config/api";
import { useMyContext } from "../context/AppContext";
const userInfo = JSON.parse(localStorage.getItem("user_info"));
const customer_id = userInfo?.user_id;

/* ---------------- Razorpay Loader ---------------- */
function loadRazorpayScript() {
    return new Promise((resolve) => {
        if (window.Razorpay) {
            resolve(true);
            return;
        }

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
}

function CartPage({ isOpen, onClose }) {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const { setInvoiceId } = useMyContext();

    useEffect(() => {
        if (isOpen) {
            const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
            setCart(storedCart);
            setLoading(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const tax = subtotal * 0.1;
    const grandTotal = subtotal + tax;

    /* ---------------- MAIN ORDER HANDLER ---------------- */
    async function handleOrder() {
        if (!cart.length) {
            toast.error("Cart is empty.");
            return;
        }

        const userInfo = JSON.parse(localStorage.getItem("user_info"));
        const token = userInfo?.token;
        if (!userInfo?.user_id) {
            toast.error("User not logged in. Please login again.");
            return;
        }
        console.log("token = ", token);

        const orderData = {
            user_id: userInfo.user_id,
            cart,
            total: grandTotal,
            method: paymentMethod === "cash" ? "cash" : "online"
        };

        try {
            setIsPlacingOrder(true);

            // 1️⃣ Create invoice / order
            const orderResponse = await createOrder(orderData, token);
            console.log("Order Response:", orderResponse);
            setInvoiceId(orderResponse.invoice_id);
            // 2️⃣ CASH PAYMENT → DONE
            if (paymentMethod === "cash") {
                toast.success("Order placed successfully (Cash)");
                localStorage.removeItem("cart");
                onClose();
                return;
            }

            // 3️⃣ ONLINE PAYMENT → Razorpay
            const razorpayLoaded = await loadRazorpayScript();
            if (!razorpayLoaded) {
                toast.error("Razorpay SDK failed to load");
                return;
            }

            const { razorpayOrder, invoice_id } = orderResponse;

            const options = {
                key: "rzp_test_RvwlfERQFOReHy",
                amount: razorpayOrder.amount,
                currency: "INR",
                name: "Raj Restaurant",
                description: "Food Order Payment",
                order_id: razorpayOrder.id,

                handler: async function (response) {
                    console.log("response = ", response);

                    try {
                        const res = await fetch(
                            `${API_BASE_URL}/api/payments/verify-payment`,
                            {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ ...response, invoice_id, customer_id })
                            }
                        );

                        const data = await res.json();

                        if (!res.ok || !data.success) {
                            toast.error("Payment verification failed");
                            return;
                        }

                        toast.success("Payment successful!");
                        localStorage.removeItem("cart");
                        onClose();
                    } catch (err) {
                        console.error(err);
                        toast.error("Payment verification failed");
                    }
                },

                modal: {
                    ondismiss: async () => {
                        try {
                            await fetch(`${API_BASE_URL}/api/payments/payment-failed`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ invoice_id }),
                            });
                            toast.error("Payment failed / cancelled");
                        } catch (err) {
                            console.error(err);
                        } finally {
                            onClose();
                        }
                    },
                },

                prefill: {
                    name: userInfo.name || "Customer",
                    email: userInfo.email || "",
                    contact: userInfo.phone || ""
                },

                theme: { color: "#16a34a" }
            };

            const rzp = new window.Razorpay(options);

            // Listen for failure event
            rzp.on("payment.failed", async () => {
                try {
                    await fetch(`${API_BASE_URL}/api/payments/payment-failed`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ invoice_id }),
                    });
                    toast.error("Payment failed");
                } catch (err) {
                    console.error(err);
                } finally {
                    onClose();
                }
            });

            rzp.open();

        } catch (error) {
            console.error(error);
            toast.error(error.message || "Order failed");
        } finally {
            setIsPlacingOrder(false);
        }
    }

    /* ---------------- UI ---------------- */
    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white w-[90%] lg:w-[60%] rounded-xl p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-xl"
                >
                    ✕
                </button>

                <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {cart.map((item) => (
                            <div key={item.id} className="flex justify-between py-2">
                                <span>{item.name} × {item.qty}</span>
                                <span>₹{item.price * item.qty}</span>
                            </div>
                        ))}

                        <hr className="my-3" />

                        <p>Total Items: {totalQty}</p>
                        <p>Subtotal: ₹{subtotal}</p>
                        <p>Tax: ₹{tax.toFixed(2)}</p>
                        <h2 className="font-bold text-lg">
                            Grand Total: ₹{grandTotal.toFixed(2)}
                        </h2>

                        <div className="mt-4 flex gap-3">
                            <select
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="border px-2 py-1 rounded"
                            >
                                <option value="cash">Cash</option>
                                <option value="online">Online</option>
                            </select>

                            <button
                                onClick={handleOrder}
                                disabled={isPlacingOrder}
                                className="bg-green-600 text-white px-4 py-1 rounded"
                            >
                                {isPlacingOrder ? "Processing..." : "Confirm & Pay"}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default CartPage;
