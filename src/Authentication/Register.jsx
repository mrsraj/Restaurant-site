import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        mob_no: "",
        role: "user",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    async function handleApi() {
        const { confirmPassword, ...dataToSend } = formData;

        try {
            const response = await fetch('http://localhost:3000/auth/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            toast.success(data.message);
            return true;
        } catch (error) {
            console.error('Error:', error.message);
            toast.error(error.message);
            return false;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (formData.email && !formData.email.includes("@gmail.com")) {
            toast.error("Please enter a valid email(@gmail.com)");
            return;
        }


        const success = await handleApi();

        if (success) {
            setFormData({
                username: "",
                email: "",
                password: "",
                mob_no: "",
                confirmPassword: "",
            });
            navigate("/login");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 bg-cover bg-center"
            style={{ backgroundImage: "url('./images/bgimage.jpg')" }}
        >
            <div className="w-full max-w-md bg-white/20 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-center text-black mb-6">
                    Register
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Full Name</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Email(Optional)</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Mobile No(Whatsapp)</label>
                        <input
                            type="text"
                            name="mob_no"
                            value={formData.mob_no}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                    >
                        Register
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-green-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}


export default Register;