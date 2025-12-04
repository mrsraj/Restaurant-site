import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FiUser, FiPhone, FiCalendar, FiUsers } from "react-icons/fi";

export default function ReservationForm() {
    const { addReservation } = useContext(AppContext);
    const [form, setForm] = useState({
        name: "",
        phone: "",
        time: "",
        guests: ""
    });

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addReservation(form);
        setForm({ name: "", phone: "", time: "", guests: "" });
        alert("Reservation added!");
    };

    return (
        <div className="w-full px-4 py-10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
            <div className="max-w-5xl mx-auto rounded-3xl shadow-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10">
                {/* 2-column layout */}
                <div className="grid md:grid-cols-2">

                    {/* LEFT: Seat overview / image */}
                    <div className="relative h-64 md:h-full">
                        <img
                            // replace with your own seat / restaurant image
                            src="https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg"
                            alt="Restaurant Seating Overview"
                            className="h-full w-full object-cover"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                        {/* Text overlay */}
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                            <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                                Live Table View
                            </p>
                            <h2 className="mt-1 text-2xl font-bold">
                                Choose your perfect dining spot.
                            </h2>
                            <p className="mt-1 text-xs text-white/70">
                                Cozy corners • Window views • Family tables • Couple seating
                            </p>
                        </div>
                    </div>

                    {/* RIGHT: Form */}
                    <div className="p-6 md:p-8 bg-white/90">
                        {/* Heading */}
                        <div className="mb-6 text-center md:text-left">
                            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-orange-500">
                                Book Your Table
                            </h2>
                            <p className="text-sm text-slate-600 mt-1">
                                Reserve your seat and skip the waiting time.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-semibold text-pink-600 mb-1">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <FiUser className="absolute left-3 top-3 text-pink-500 text-lg" />
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full rounded-xl border border-pink-200 bg-white px-10 py-3 text-sm text-slate-800 shadow-sm focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition"
                                        value={form.name}
                                        onChange={handleChange("name")}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-semibold text-orange-600 mb-1">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <FiPhone className="absolute left-3 top-3 text-orange-500 text-lg" />
                                    <input
                                        type="tel"
                                        placeholder="+91 98765 43210"
                                        className="w-full rounded-xl border border-orange-200 bg-white px-10 py-3 text-sm text-slate-800 shadow-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition"
                                        value={form.phone}
                                        onChange={handleChange("phone")}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Date & Time */}
                            <div>
                                <label className="block text-sm font-semibold text-purple-600 mb-1">
                                    Date & Time
                                </label>
                                <div className="relative">
                                    <FiCalendar className="absolute left-3 top-3 text-purple-500 text-lg" />
                                    <input
                                        type="datetime-local"
                                        className="w-full rounded-xl border border-purple-200 bg-white px-10 py-3 text-sm text-slate-800 shadow-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition"
                                        value={form.time}
                                        onChange={handleChange("time")}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Guests */}
                            <div>
                                <label className="block text-sm font-semibold text-blue-600 mb-1">
                                    Guests
                                </label>
                                <div className="relative">
                                    <FiUsers className="absolute left-3 top-3 text-blue-500 text-lg" />
                                    <input
                                        type="number"
                                        min="1"
                                        placeholder="2"
                                        className="w-full rounded-xl border border-blue-200 bg-white px-10 py-3 text-sm text-slate-800 shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition"
                                        value={form.guests}
                                        onChange={handleChange("guests")}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Button */}
                            <button
                                type="submit"
                                className="w-full rounded-xl py-3 font-semibold text-white shadow-lg 
                                           bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500
                                           hover:brightness-110 active:scale-95 transition"
                            >
                                Confirm Reservation
                            </button>

                            <p className="text-xs text-center text-slate-500 mt-1">
                                You’ll receive a confirmation message once your table is booked.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
