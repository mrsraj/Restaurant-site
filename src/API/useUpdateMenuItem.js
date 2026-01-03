import { useState } from "react";

const useUpdateMenuItem = (setError) => {
    const [updating, setUpdating] = useState(false);

    const updateMenuItem = async (id, formData) => {
        try {
            setUpdating(true);
            setError(null);
            console.log("formData = ", formData);

            const userInfo = JSON.parse(localStorage.getItem("user_info"));
            const token = userInfo?.token;
            if (!token) throw new Error("User not logged in ");

            // Append id to FormData
            formData.append("id", id);

            const res = await fetch("http://localhost:3000/api/update/menuitem", {
                method: "PUT", // correct for update
                headers: {
                    Authorization: `Bearer ${token}`, // only auth header, no Content-Type
                },
                body: formData,
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Failed to update menu item");
            }

            const updatedItem = await res.json();
            return updatedItem;

        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to update menu item");
            throw err; // re-throw to handle in component (toast)
        } finally {
            setUpdating(false);
        }
    };

    return { updating, updateMenuItem };
};

export default useUpdateMenuItem;
