
const TableReservationAPI = async (formData) => {

    try {
        const res = await fetch("http://localhost:3000/api/table/reservation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        return res;
    } catch (error) {
        console.error("Reservation error:", error);
    }
};

export default TableReservationAPI;