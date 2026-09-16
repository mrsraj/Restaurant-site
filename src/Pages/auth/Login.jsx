import PasswordInput from "../../components/common/PasswordInput";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiFetching from "../../services/api/api";
import { useMyContext } from "../../context/AppContext";

export default function Login() {
    const { setUser, setAuth } = useMyContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await ApiFetching(formData);


            if (response.error) {
                setError(response.error);
                return setLoading(false);
            }

            setUser(response.role);
            setAuth(response.role);

            //localStorage.setItem("user", response.role);

            navigate(response.role === "kitchen" ? "/kitchen/orders" :
                response.role === "super_admin" ? "/admin/staff" :
                response.role === "restaurant_admin" ? "/admin/dashboard" : "/", { replace: true });
        } catch (err) {
            setError("Something went wrong, please try again.");
            console.error("Login error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[75vh] bg-[#f5f6f2] px-4 py-12"

        >
            <div className="w-full max-w-md bg-white border border-[#e1e7e2] rounded-2xl shadow-sm p-8 sm:p-10">
                <h2 className="text-3xl font-semibold tracking-tight text-[#1c302e] mb-3">
                    Welcome back
                </h2>

                <p className="text-sm text-slate-500 leading-relaxed mb-8">Sign in to your account. We will open the workspace for your role automatically.</p>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block mb-1 font-medium">Mobile number</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full border border-[#dce3da] bg-[#fcfdfa] rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#81bba1]"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <PasswordInput
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border border-[#dce3da] bg-[#fcfdfa] rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#81bba1]"
                            required
                        />
                    </div>

                    {error && <p className="text-red-600 text-sm text-center">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded text-white transition ${loading ? "bg-gray-400" : "bg-[#206c56] hover:bg-[#174f40]"
                            }`}
                    >
                        {loading ? "Signing in…" : "Sign in"}
                    </button>

                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-green-600 hover:underline">
                        Register
                    </Link>
                </p>

                {/* Forgot Button */}
                <div className="text-center mt-4">
                    <Link
                        to="/forget-password"
                        className="text-sm text-orange-500 hover:underline"
                    >
                        Forgot Password?
                    </Link>
                </div>
            </div>
        </div>
    );
}
