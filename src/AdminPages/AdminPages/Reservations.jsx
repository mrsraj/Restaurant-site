import { useMyContext } from "../../context/AppContext";

function Reservations() {
    const { reservations, messages } = useMyContext();

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Admin Panel</h2>

            {/* Reservations */}
            <h3 className="text-xl font-semibold mb-2">Reservations</h3>
            <ul className="mb-6 space-y-2">
                {reservations.length > 0 ? (
                    reservations.map((res, i) => (
                        <li key={i} className="border p-3 rounded shadow">
                            {res.name} — {res.phone} — {res.time} — {res.guests} guests
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500">No reservations yet.</p>
                )}
            </ul>

            {/* Messages */}
            <h3 className="text-xl font-semibold mb-2">Messages</h3>
            <ul className="space-y-2">
                {messages.length > 0 ? (
                    messages.map((msg, i) => (
                        <li key={i} className="border p-3 rounded shadow">
                            <strong>{msg.name}</strong> ({msg.email}): {msg.message}
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500">No messages yet.</p>
                )}
            </ul>
        </div>
    );
}

export default Reservations;
