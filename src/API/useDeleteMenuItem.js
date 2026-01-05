// src/API/useDeleteMenuItem.js
import { useState } from "react";

const useDeleteMenuItem = (setMenuItems, setError) => {
    const [deleting, setDeleting] = useState(false);

    const deleteMenuItem = async (id) => {
        try {
            setDeleting(true);
            setError(null);

            // READ TOKEN CORRECTLY
            const userInfo = JSON.parse(localStorage.getItem("user_info"));
            const token = userInfo?.token;

            const res = await fetch(`${API_BASE_URL}/api/menu/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // CHECK SERVER RESPONSE
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.message || "Failed to delete menu item");
            }

            // UPDATE UI
            setMenuItems((prev) => prev.filter((item) => item.id !== id));
            return res;
        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to delete menu item");
        } finally {
            setDeleting(false);
        }
    };

    return { deleting, deleteMenuItem };
};

export default useDeleteMenuItem;
