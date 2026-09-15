import { apiFetch } from "./scopedFetch";
import { API_BASE_URL } from "../../config/api";
export async function authRequest(path, options = {}) {
  const session = JSON.parse(localStorage.getItem("user_info") || "null");
  const response = await apiFetch(API_BASE_URL + path, {
    ...options,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.token || ""}`, ...options.headers }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
}
export default async function ApiFetching(credential) {
  try {
    const res = await apiFetch(`${API_BASE_URL}/api/v1/sessions`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(credential)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");
    localStorage.setItem("user", data.role);
    localStorage.setItem("user_info", JSON.stringify(data));
    return data;
  } catch (error) { return { error: error.message }; }
}
