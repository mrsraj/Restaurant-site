import React from "react";

export default function Payment() {

    const loadRazorpay = async () => {
        try {
            //2️⃣ Razorpay checkout options
            const options = {
                key: "rzp_test_RvwlfERQFOReHy",
                amount: order.amount,
                currency: "INR",
                name: "Raj Restaurant",
                description: "Test Payment",
                order_id: order.id,

                handler: async function (response) {
                    await fetch("http://localhost:3000/api/payments/verify-payment",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(response)
                        }
                    );
                    alert("Payment Successful");
                },

                prefill: {
                    name: "Test User",
                    email: "test@example.com",
                    contact: "9999999999"
                },

                theme: { color: "#3399cc" }
            };

            // 3️⃣ OPEN PAYMENT OPTIONS POPUP
            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };

    return (
        <button
            onClick={loadRazorpay}
            className="bg-slate-400 px-4 py-2 rounded"
        >
            Pay ₹500
        </button>
    );
}
