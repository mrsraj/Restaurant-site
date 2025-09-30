import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

function Contact() {
    const { addMessage } = useContext(AppContext);

    const [form, setForm] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addMessage(form);
        setForm({ name: "", email: "", message: "" });
        alert("Message sent!");
    };

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full border p-2"
                    value={form.name}
                    onChange={handleChanges}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full border p-2"
                    value={form.email}
                    onChange={handleChanges}
                    required
                />
                <textarea
                    name="message"
                    placeholder="Message"
                    className="w-full border p-2"
                    rows="4"
                    value={form.message}
                    onChange={handleChanges}
                    required
                ></textarea>
                <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">
                    Send
                </button>
            </form>

            {/* Static Map */}
            <div className="mt-8">
                <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.51016345602!2d-122.4194156846818!3d37.7749292797599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c3e4b35bb%3A0x0!2zMzfCsDQ2JzI5LjciTiAxMjLCsDI1JzA3LjkiVw!5e0!3m2!1sen!2sus!4v1675603026573!5m2!1sen!2sus"
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

export default Contact;
