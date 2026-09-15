import { API_BASE_URL } from "../../config/api";
export function selectedRestaurant() {
  try {
    const session = JSON.parse(localStorage.getItem("user_info") || "null");
    return ["restaurant_admin", "kitchen"].includes(session?.role)
      ? session.restaurant_id : localStorage.getItem("restaurant_id") || 1;
  } catch { return 1; }
}
export async function apiFetch(url, options = {}) {
  if (typeof url !== "string" || !url.startsWith(API_BASE_URL + "/")) return fetch(url, options);
  const headers = new Headers(options.headers);
  headers.set("X-Restaurant-Id", String(selectedRestaurant()));
  try {
    const session = JSON.parse(localStorage.getItem("user_info") || "null");
    if (session?.token && !headers.has("Authorization")) headers.set("Authorization", "Bearer " + session.token);
  } catch { /* Requests without a saved session remain unauthenticated. */ }
  return fetch(url, { ...options, headers });
}
