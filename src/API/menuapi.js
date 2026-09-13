import { apiFetch } from "../API/scopedFetch";
import { API_BASE_URL } from "../config/api";
async function MenuFetching() {
  try {
    const res = await apiFetch(`${API_BASE_URL}/api/v1/menu-items`, {
      method: "GET"
    });

    if (!res.ok) {
      throw new Error(`Something went wrong: ${res.status}`);
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.error("Fetch error:", error);
    return { error: error.message };
  }
}

export default MenuFetching;
