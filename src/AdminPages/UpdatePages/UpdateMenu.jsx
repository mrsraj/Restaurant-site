import React, { useEffect, useState } from "react";

const EMPTY_ITEM = {
    name: "",
    descriptions: "",
    price: "",
    discount: "",
    c_name: "Breakfast",
    is_active: 1,
    image_file: null,
    image_preview: "",
};

const UpdateMenu = ({ isOpen, onClose, editItem }) => {
    const [formData, setFormData] = useState(EMPTY_ITEM);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    /* Populate form for UPDATE only */
    useEffect(() => {
        if (editItem) {
            setFormData({
                name: editItem.name || "",
                descriptions: editItem.descriptions || "",
                price: editItem.price || "",
                discount: editItem.discount || "",
                c_name: editItem.c_name || "",
                is_active: editItem.is_active ?? 1,
                image_file: null,
                image_preview: editItem.image_urls
                    ? `http://localhost:3000/uploads/${editItem.image_urls}`
                    : "",
            });
        }
    }, [editItem]);

    if (!isOpen || !editItem) return null;

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFormData((prev) => ({
            ...prev,
            image_file: file,
            image_preview: URL.createObjectURL(file),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.name.trim()) return setError("Name is required");
        if (!formData.price || formData.price <= 0)
            return setError("Valid price is required");

        const token = localStorage.getItem("token");
        if (!token) return setError("Unauthorized");

        const data = new FormData();
        data.append("id", editItem.id);
        data.append("name", formData.name);
        data.append("descriptions", formData.descriptions);
        data.append("price", formData.price);
        data.append("discount", formData.discount || 0);
        data.append("c_name", formData.c_name);
        data.append("is_active", formData.is_active);

        if (formData.image_file) {
            data.append("image", formData.image_file);
        }

        try {
            setLoading(true);

            const res = await fetch(
                "http://localhost:3000/api/menu/upload",
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: data,
                }
            );

            if (!res.ok) {
                throw new Error("Failed to update menu item");
            }

            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-2">
            <div className="bg-white w-full max-w-md rounded-lg relative
                max-h-[90vh] overflow-y-auto p-6">

                {/* ❌ Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 w-8 h-8
                    flex items-center justify-center rounded-full
                    bg-red-500 text-white hover:bg-red-600 transition"
                >
                    ✕
                </button>

                <h2 className="text-xl font-semibold mb-4 text-center text-[#16a34a]">
                    Update Menu Item
                </h2>

                {error && (
                    <p className="text-red-500 text-sm mb-3 text-center">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="w-full border px-3 py-2 rounded"
                    />

                    <textarea
                        name="descriptions"
                        value={formData.descriptions}
                        onChange={handleChange}
                        placeholder="Description"
                        className="w-full border px-3 py-2 rounded"
                    />

                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Price"
                        className="w-full border px-3 py-2 rounded"
                    />

                    <input
                        type="number"
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                        placeholder="Discount (%)"
                        className="w-full border px-3 py-2 rounded"
                    />

                    <select
                        name="c_name"
                        value={formData.c_name}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option>Breakfast</option>
                        <option>Lunch</option>
                        <option>Dinner</option>
                    </select>

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="is_active"
                            checked={formData.is_active === 1}
                            onChange={handleChange}
                        />
                        Active
                    </label>

                    <input type="file" accept="image/*" onChange={handleFileChange} />

                    {formData.image_preview && (
                        <img
                            src={formData.image_preview}
                            alt="Preview"
                            className="w-24 h-24 object-cover rounded"
                        />
                    )}

                    {/* ✅ Save Button */}
                    <button
                        disabled={loading}
                        className={`w-full px-4 py-2 rounded text-white
                        ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700"
                            }`}
                    >
                        {loading ? "Updating..." : "Update Item"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateMenu;
