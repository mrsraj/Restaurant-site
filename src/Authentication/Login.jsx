import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiFetching from "../API/api";
import { useMyContext } from "../context/AppContext";

export default function Login() {
    const { setUser ,setAuth} = useMyContext();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await ApiFetching(formData);
            console.log("response =", response);

            if (response.error) {
                setError(response.error);
                return setLoading(false);
            }

            setUser(response.role);
            setAuth([]);

            //localStorage.setItem("user", response.role);

            // Redirect based on role
            if (response.role === "admin") {
                // navigate("/admin/dashboard");
                console.log("Hello");

            } else {
                navigate("/");
            }

        } catch (err) {
            setError("Something went wrong, please try again.");
            console.error("Login error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 bg-cover bg-center"
            style={{ backgroundImage: "url('./images/bgimage.jpg')" }}
        >
            <div className="w-full max-w-md bg-white/20 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-center text-black mb-6">
                    LogIn
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block mb-1 font-medium">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            required
                        />
                    </div>

                    {error && <p className="text-red-600 text-sm text-center">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded text-white transition ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                            }`}
                    >
                        {loading ? "Logging in..." : "LogIn"}
                    </button>

                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-green-600 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
