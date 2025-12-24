
const TableReservationAPI = async (formData) => {

    try {
        const userInfo = JSON.parse(localStorage.getItem("user_info"));
        const token = userInfo?.token;

        const res = await fetch("http://localhost:3000/api/table/reservation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(formData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to create reservation");
        }

        const data = await res.json();
        return data;

    } catch (error) {
        console.error("Reservation error:", error);
        throw error; // re-throw so caller can handle it
    }

};

export default TableReservationAPI;