// src/components/CartPage.jsx
import React, { useEffect, useState } from "react";
import { createOrder } from "../services/orderService";
import { payWithRazorpay } from "../payment/razorpayPayment";

function CartPage({ isOpen, onClose }) {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const paymentMethods = ["Cash", "Card", "UPI", "Net Banking"];

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
    const taxRate = 0.1;
    const tax = subtotal * taxRate;
    const grandTotal = subtotal + tax;

    async function handleOrder() {
        if (!cart || cart.length === 0) {
            alert("Cart is empty");
            return;
        }

        if (!paymentMethod) {
            alert("Please select a payment method");
            return;
        }

        const userInfo = JSON.parse(localStorage.getItem("user_info"));
        if (!userInfo || !userInfo.user_id) {
            alert("User not logged in");
            return;
        }

        const orderData = {
            user_id: userInfo.user_id,
            cart: cart,
            total: grandTotal,
            method: paymentMethod, // "cash" | "card" | "upi" | "net banking"
        };

        try {
            setIsPlacingOrder(true);
            console.log("orderData = ",orderData);

            // 1) Hit backend to create order (and Razorpay order if needed)
            const orderResponse = await createOrder(orderData);
            
            

            // 2) If Cash → no payment gateway
            if (paymentMethod === "cash") {
                alert("Order placed successfully with Cash payment!");
                localStorage.removeItem("cart");
                setCart([]);
                onClose();
                return;
            }

            // 3) Online payments → go through Razorpay
            if (["card", "upi", "net banking"].includes(paymentMethod)) {
                await payWithRazorpay(orderResponse, {
                    onSuccess: () => {
                        alert("Payment successful and order confirmed!");
                        localStorage.removeItem("cart");
                        setCart([]);
                        onClose();
                    },
                    onFailure: (msg) => {
                        alert(msg || "Payment failed or cancelled");
                    },
                });
            }
        } catch (error) {
            console.error(error);
            alert(error.message || "Something went wrong. Please try again.");
        } finally {
            setIsPlacingOrder(false);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 backdrop-blur-sm">
            <div className="bg-white w-[95%] sm:w-[80%] lg:w-[60%] max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-6 md:p-8 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>

                <h1 className="text-2xl md:text-3xl font-bold mb-6">Your Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* LEFT SIDE — Cart Items */}
                    <div className="lg:col-span-2 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                        {loading ? (
                            <div className="flex justify-center items-center h-40">
                                <div className="animate-spin h-10 w-10 border-4 border-green-600 border-t-transparent rounded-full">
                                    loading
                                </div>
                            </div>
                        ) : cart.length === 0 ? (
                            <p className="text-center text-gray-500 py-10">
                                Your cart is empty
                            </p>
                        ) : (
                            cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm"
                                >
                                    <div>
                                        <h2 className="font-semibold text-lg">{item.name}</h2>
                                        <p className="text-gray-600">
                                            ₹{item.price}{" "}
                                            <span className="text-gray-600 ml-2">
                                                <b>Qty</b>: {item.qty}
                                            </span>
                                        </p>
                                    </div>

                                    <span className="font-bold text-lg">
                                        ₹{item.price * item.qty}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>

                    {/* RIGHT SIDE — Summary */}
                    <div className="p-5 border rounded-lg bg-gray-50 shadow-md h-fit sticky top-0">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                        <div className="space-y-2 text-gray-800">
                            <p className="flex justify-between">
                                <span>Total Items:</span>
                                <span>{totalQty}</span>
                            </p>

                            <p className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>₹{subtotal}</span>
                            </p>

                            <p className="flex justify-between">
                                <span>Tax (10%):</span>
                                <span>₹{tax.toFixed(2)}</span>
                            </p>

                            <hr className="my-3" />

                            <p className="flex justify-between text-lg font-bold">
                                <span>Grand Total:</span>
                                <span>₹{grandTotal.toFixed(2)}</span>
                            </p>
                        </div>

                        <div className="flex justify-center items-center mt-4 gap-3">
                            {/* Payment Method Select */}
                            <select
                                name="payment"
                                id="payment"
                                className="w-20 border-gray-100 h-15 rounded-lg px-1 py-2 bg-gray-300"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                                <option value="cash">CASH</option>
                                {paymentMethods.map((method) => (
                                    <option key={method} value={method.toLowerCase()}>
                                        {method}
                                    </option>
                                ))}
                            </select>

                            {/* Confirm Button */}
                            <button
                                onClick={handleOrder}
                                disabled={!cart || cart.length === 0 || isPlacingOrder}
                                className={`w-full py-1 rounded-lg text-center font-semibold transition
                                    ${cart && cart.length > 0 && !isPlacingOrder
                                        ? "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                                    }`}
                            >
                                {isPlacingOrder ? "Processing..." : "Confirm & Pay"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;
