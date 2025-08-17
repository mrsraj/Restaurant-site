import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function ReservationForm() {
    const { addReservation } = useContext(AppContext);
    const [form, setForm] = useState(
        {
            name: "",
            phone: "",
            time: "",
            guests: ""
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        addReservation(form);
        setForm({ name: "", phone: "", time: "", guests: "" });
        alert("Reservation added!");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <input type="text" placeholder="Name" className="w-full border p-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input type="text" placeholder="Phone" className="w-full border p-2" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input type="datetime-local" className="w-full border p-2" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
            <input type="number" placeholder="Guests" className="w-full border p-2" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} />
            <button className="bg-red-600 text-white px-4 py-2 rounded">Reserve</button>
        </form>
    );
}
