import { API_BASE_URL } from "../config/api";
async function GetAdminOrder(setOrders) {

    try {
        const userInfo = JSON.parse(localStorage.getItem("user_info"));
        const token = userInfo?.token;
        const res = await fetch(`${API_BASE_URL}/api/adminmenu`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to fetch orders");
        }

        const data = await res.json();
        setOrders(data); // now safe
    } catch (err) {
        console.error("Error fetching orders:", err);
    }
}

export default GetAdminOrder;
