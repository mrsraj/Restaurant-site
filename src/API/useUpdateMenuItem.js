// src/API/useUpdateMenuItem.js
import { useState } from "react";

const useUpdateMenuItem = (setMenuItems, setError) => {
    const [updating, setUpdating] = useState(false);

    const updateMenuItem = async (id, payload) => {
        try {
            setUpdating(true);
            setError(null);

            const res = await fetch("http://localhost:3000/api/menu", {
                method: "UPDATE"
            });


            const updatedItem = response.data.data || response.data;

            setMenuItems((prev) =>
                prev.map((item) => (item.id === id ? updatedItem : item))
            );
        } catch (err) {
            console.error(err);
            const msg =
                err.response?.data?.message ||
                "Failed to update menu item. Please try again.";
            setError(msg);
        } finally {
            setUpdating(false);
        }
    };

    return { updating, updateMenuItem };
};

export default useUpdateMenuItem;
