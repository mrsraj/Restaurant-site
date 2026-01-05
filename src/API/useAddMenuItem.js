// src/API/useAddMenuItem.js
import { useState } from "react";
import { API_BASE_URL } from "../config/api";

const useAddMenuItem = (setMenuItems, setError, setOpenModal) => {
    const [adding, setAdding] = useState(false);

    const addMenuItem = async (formData) => {
        try {
            setAdding(true);
            setError(null);

            const userInfo = JSON.parse(localStorage.getItem("user_info"));
            const token = userInfo?.token;

            const response = await fetch(`${API_BASE_URL}/api/menu/additem`,{
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData, 
                }
            );

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(errText || "Failed to add menu item");
            }

            const newItem = await response.json(); // ✅ fetch way

            setMenuItems((prev) => [...prev, newItem]);

            if (setOpenModal) setOpenModal(false);
        } catch (err) {
            console.error(err);
            setError(
                err.message || "Failed to add menu item. Please try again."
            );
        } finally {
            setAdding(false);
        }
    };

    return { adding, addMenuItem };
};

export default useAddMenuItem;
