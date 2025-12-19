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

const MenuFormModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState(EMPTY_ITEM);
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        if (name === "is_active") {
            setFormData((prev) => ({
                ...prev,
                is_active: checked ? 1 : 0,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
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

        if (!formData.name.trim()) {
            setError("Name is required");
            return;
        }

        const data = new FormData();
        data.append("name", formData.name);
        data.append("descriptions", formData.descriptions);
        data.append("price", formData.price);
        data.append("discount", formData.discount || 0);
        data.append("c_name", formData.c_name);
        data.append("is_active", formData.is_active);

        if (formData.image_file) {
            data.append("image", formData.image_file); // must match multer
        }

        await fetch("http://localhost:3000/api/menu/upload", {
            method: "POST",
            body: data,
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Add Menu Item</h2>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />

                    <textarea
                        name="descriptions"
                        placeholder="Description"
                        value={formData.descriptions}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />

                    {formData.image_preview && (
                        <img
                            src={formData.image_preview}
                            alt="preview"
                            className="w-24 h-24 object-cover rounded"
                        />
                    )}

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />

                    <button className="bg-blue-600 text-white px-4 py-2 rounded">
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MenuFormModal;
