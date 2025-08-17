import ReservationForm from "../components/ReservationForm";

export default function Booking() {
    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Book a Table</h2>
            <ReservationForm />
        </div>
    );
}
