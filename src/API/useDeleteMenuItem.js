// src/API/useDeleteMenuItem.js
import { useState } from "react";

const useDeleteMenuItem = (setMenuItems, setError) => {
    const [deleting, setDeleting] = useState(false);

    console.log("Working Add function");
    

    const deleteMenuItem = async (id) => {
        try {
            setDeleting(true);
            setError(null);

            const res = await fetch("http://localhost:3000/api/menu", {
                method: "DELETE"
            });


            setMenuItems((items) => items.filter((item) => item.id !== id));
        } catch (err) {
            console.error(err);
            const msg =
                err.response?.data?.message ||
                "Failed to delete menu item. Please try again.";
            setError(msg);
        } finally {
            setDeleting(false);
        }
    };

    return { deleting, deleteMenuItem };
};

export default useDeleteMenuItem;
