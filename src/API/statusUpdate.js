async function updateMenuStatus(data) {
    try {
        const response = await fetch("http://localhost:3000/api/admin/status", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}` // if using JWT
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to update status");
        }

        return result;
    } catch (error) {
        console.error("Status update error:", error.message);
        throw error;
    }
}

export default updateMenuStatus;