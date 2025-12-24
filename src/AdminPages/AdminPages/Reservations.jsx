
import { useEffect, useState } from "react";
import updateReserveStatus from "../../API/updatereserveStatus";

export default function Reservations() {
    const [reservations, setReservations] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        fetch("http://localhost:3000/api/table/getreserv")
            .then((res) => res.json())
            .then((data) => setReservations(data));
    }, [refresh]);

    const updateStatus = async (id, status) => {
        try {
            const res = await updateReserveStatus(id, status);

            // toggle refresh to re-fetch data
            setRefresh(prev => !prev);

            console.log("Reservation updated:", res);
        } catch (error) {
            console.error("Failed to update status:", error.message);
        }
    };


    return (
        <div className="p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
                Table Reservations
            </h2>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-3">Customer</th>
                            <th className="p-3">Phone</th>
                            <th className="p-3">Persons</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Time</th>
                            <th className="p-3">Table No</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {reservations.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="p-6 text-center text-gray-500">
                                    No reservations found
                                </td>
                            </tr>
                        ) : (
                            reservations.map((r) => (
                                <tr
                                    key={r.id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="p-3 font-medium">
                                        {r.customer_name}
                                    </td>
                                    <td className="p-3">{r.customer_phone}</td>
                                    <td className="p-3">{r.number_of_persons}</td>
                                    <td className="p-3">{r.reservation_date}</td>
                                    <td className="p-3">{r.reservation_time}</td>
                                    <td className="p-3">{r.table_no}</td>

                                    <td className="p-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold
                                                    ${r.status === "pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : r.status === "confirmed"
                                                        ? "bg-green-100 text-green-700"
                                                        : r.status === "cancelled"
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-indigo-100 text-indigo-700"
                                                }`}
                                        >
                                            {r.status}
                                        </span>
                                    </td>

                                    <td className="p-3 text-center space-x-2">
                                        {r.status === "pending" && (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        updateStatus(r.id, "confirmed")
                                                    }
                                                    className="px-3 py-1 rounded-md bg-green-600 text-white text-xs hover:bg-green-700 transition"
                                                >
                                                    Accept
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        updateStatus(r.id, "cancelled")
                                                    }
                                                    className="px-3 py-1 rounded-md bg-red-600 text-white text-xs hover:bg-red-700 transition"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        )}

                                        {r.status !== "pending" && (
                                            <span className="text-gray-400 text-xs">
                                                —
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
