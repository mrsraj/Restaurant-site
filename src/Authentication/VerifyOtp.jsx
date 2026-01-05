import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
const VerifyOtp = () => {
    const [mobNo, setMobNo] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);

        try {
            const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mob_no: mobNo.trim(),
                    otp: otp.trim(),
                    password: password.trim(),
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            setMessage(data.message);

            // Redirect to login after success
            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Verify OTP
                </h2>

                {error && (
                    <p className="text-center text-sm mb-3 text-red-600">
                        {error}
                    </p>
                )}

                {message && (
                    <p className="text-center text-sm mb-3 text-green-600">
                        {message}
                    </p>
                )}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Mobile Number"
                        className="w-full border p-2 mb-3 rounded"
                        value={mobNo}
                        onChange={(e) => setMobNo(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="6-digit OTP"
                        className="w-full border p-2 mb-3 rounded text-center tracking-widest"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        required
                    />

                    <input
                        type="password"
                        placeholder="New Password"
                        className="w-full border p-2 mb-4 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded text-white transition
                                 ${loading
                                ? "bg-orange-300 cursor-not-allowed"
                                : "bg-orange-500 hover:bg-orange-600"}
                                `}
                    >
                        {loading ? "Verifying..." : "Verify OTP & Reset Password"}
                    </button>

                </form>

                <div className="text-center mt-4">
                    <Link
                        to="/forget-password"
                        className="text-sm text-orange-500 hover:underline"
                    >
                        Resend OTP
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default VerifyOtp;
