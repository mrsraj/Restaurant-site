// src/API/useAddMenuItem.js
import { useState } from "react";

const useAddMenuItem = (setMenuItems, setError, setOpenModal) => {
    const [adding, setAdding] = useState(false);

    const addMenuItem = async (payload) => {
        try {
            setAdding(true);
            setError(null);

            const res = await fetch("http://localhost:3000/api/menu", {
                method: "POST"
            });


            const newItem = response.data.data || response.data;

            setMenuItems((prev) => [...prev, newItem]);

            if (setOpenModal) setOpenModal(false);
        } catch (err) {
            console.error(err);
            const msg =
                err.response?.data?.message ||
                "Failed to add menu item. Please try again.";
            setError(msg);
        } finally {
            setAdding(false);
        }
    };

    return { adding, addMenuItem };
};

export default useAddMenuItem;
