
import { useState } from "react";
import toast from "react-hot-toast";
import TableReservationAPI from "../API/TableReservationAPI";

export default function Booking() {
    const [error, setError] = useState('');
    const userInfo = JSON.parse(localStorage.getItem("user_info"));
    const user_id = userInfo?.user_id;

    const [formData, setFormData] = useState({
        customer_name: "",
        customer_phone: "",
        customer_email: "",
        number_of_persons: 1,
        reservation_date: "",
        reservation_time: "",
        special_request: "",
        user_id,
    });


    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await TableReservationAPI(formData);

            if (!res.ok) {
                const errorData = await res.json();
                toast.error(
                    errorData?.message || "Failed to create reservation"
                );
                return;
            }

            const data = await res.json();

            toast.success("Reservation submitted successfully!");

            setFormData({
                customer_name: "",
                customer_phone: "",
                customer_email: "",
                number_of_persons: 1,
                reservation_date: "",
                reservation_time: "",
                special_request: "",
            });

            return data;
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        }
    };


    return (
        <div className="max-w-xl mx-auto bg-[#fff] p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-1 text-center">
                Table Reservation
            </h2>
            <p className="text-center text-gray-500 mb-8">
                Book your dining experience in seconds
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Customer Name
                    </label>
                    <input
                        type="text"
                        name="customer_name"
                        value={formData.customer_name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        name="customer_phone"
                        value={formData.customer_phone}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Email (optional)
                    </label>
                    <input
                        type="email"
                        name="customer_email"
                        value={formData.customer_email}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                </div>

                {/* Persons */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Number of Persons
                    </label>
                    <input
                        type="number"
                        min="1"
                        name="number_of_persons"
                        value={formData.number_of_persons}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Reservation Date
                        </label>
                        <input
                            type="date"
                            name="reservation_date"
                            value={formData.reservation_date}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Reservation Time
                        </label>
                        <input
                            type="time"
                            name="reservation_time"
                            value={formData.reservation_time}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Special Request */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Special Request
                    </label>
                    <textarea
                        name="special_request"
                        value={formData.special_request}
                        onChange={handleChange}
                        rows="3"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
                >
                    Reserve Table
                </button>
            </form>
        </div>
    );
}
