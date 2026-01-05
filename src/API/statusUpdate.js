import { API_BASE_URL } from "../config/api";
async function updateMenuStatus(data) {
    try {
        const userInfo = JSON.parse(localStorage.getItem("user_info"));
        const token = userInfo?.token;

        const response = await fetch(`${API_BASE_URL}/api/admin/status`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
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