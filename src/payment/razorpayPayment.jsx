// src/payment/razorpayPayment.js
import { verifyPayment } from "../services/orderService";

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

/**
 * orderResponse should contain:
 * {
 *   razorpay_order_id,
 *   amount,
 *   currency,
 *   customer: { name, email, phone }
 * }
 *
 * callbacks: { onSuccess: () => {}, onFailure: (msg) => {} }
 */
export async function payWithRazorpay(orderResponse, callbacks = {}) {
    const { onSuccess, onFailure } = callbacks;

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
        onFailure?.("Razorpay SDK failed to load. Check your internet.");
        return;
    }

    const { razorpay_order_id, amount, currency, customer } = orderResponse;

    const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // TODO: replace with your real key
        amount: amount, // in paise
        currency: currency || "INR",
        name: "Your Shop Name",
        description: "Order Payment",
        order_id: razorpay_order_id,
        prefill: {
            name: customer?.name || "",
            email: customer?.email || "",
            contact: customer?.phone || "",
        },
        handler: async function (response) {
            try {
                const verifyData = await verifyPayment({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                });

                if (verifyData.success) {
                    onSuccess?.();
                } else {
                    onFailure?.("Payment verification failed. Please contact support.");
                }
            } catch (err) {
                console.error(err);
                onFailure?.("Error verifying payment. Please contact support.");
            }
        },
        modal: {
            ondismiss: function () {
                onFailure?.("Payment window closed.");
            },
        },
        theme: {
            color: "#16a34a",
        },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
}
