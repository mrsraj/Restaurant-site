import { apiFetch } from "./scopedFetch";
import { API_BASE_URL } from "../../config/api";
async function getCategory() {
    try {
        const userInfo = JSON.parse(localStorage.getItem("user_info"));

        const token = userInfo?.token;

        const resp = await apiFetch(
            `${API_BASE_URL}/api/v1/categories`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!resp.ok) {
            throw new Error(`HTTP error! Status: ${resp.status}`);
        }

        const categories = await resp.json();
        return categories;

    } catch (error) {
        console.error("Failed to fetch categories:", error);
        return [];
    }
}

export default getCategory;
