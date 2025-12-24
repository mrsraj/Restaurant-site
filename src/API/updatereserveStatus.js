
async function updateReserveStatus(id, status) {
    try {
        const userInfo = JSON.parse(localStorage.getItem("user_info"));

        const token = userInfo?.token;
        const user_id = userInfo?.user_id;

        const res = await fetch("http://localhost:3000/api/table/reserveStatus",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // optional
                },
                body: JSON.stringify({
                    id:id,
                    status:status,
                    user_id:user_id,
                }),
            }
        );

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to update reservation");
        }

        return data;
    } catch (error) {
        console.error("Update reservation status error:", error);
        throw error;
    }
}

export default updateReserveStatus;
