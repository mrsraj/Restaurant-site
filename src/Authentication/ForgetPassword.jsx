import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
    const [mobNo, setMobNo] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const sendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("http://localhost:3000/auth/forget/password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mob_no: mobNo.trim() }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            // navigate after OTP sent
            navigate("/verify-otp", { state: { mob_no: mobNo.trim() } });

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Forgot Password
                </h2>

                {error && <p className="text-red-600 text-sm mb-3 text-center">{error}</p>}

                <form onSubmit={sendOtp}>
                    <input
                        type="text"
                        placeholder="Registered Mobile Number"
                        className="w-full border p-2 mb-4 rounded"
                        value={mobNo}
                        onChange={(e) => setMobNo(e.target.value)}
                        required
                    />

                    <button
                        disabled={loading}
                        className={`w-full py-2 rounded text-white transition
                                    ${loading ? "bg-orange-300 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"}
                                `}
                    >
                        {loading ? "Sending OTP..." : "Send OTP"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;
