import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Contact() {
    const { addMessage } = useContext(AppContext);
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        addMessage(form);
        setForm({ name: "", email: "", message: "" });
        alert("Message sent!");
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
                <input type="text" placeholder="Name" className="w-full border p-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input type="email" placeholder="Email" className="w-full border p-2" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <textarea placeholder="Message" className="w-full border p-2" rows="4" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}></textarea>
                <button className="bg-red-600 text-white px-4 py-2 rounded">Send</button>
            </form>

            {/* Static Map */}
            <div className="mt-8">
                <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!..."
                    width="100%"
                    height="300"
                    allowFullScreen
                    loading="lazy"
                    className="rounded-lg shadow-lg"
                ></iframe>
            </div>
        </div>
    );
}
