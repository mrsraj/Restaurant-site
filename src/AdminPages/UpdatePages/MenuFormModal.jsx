import React, { useEffect, useState } from "react";

const EMPTY_ITEM = {
    id: null,
    name: "",
    descriptions: "",
    image_urls: "",
    price: "",
    discount: "",
    c_name: "Breakfast",
    is_active: 1,
};

const MenuFormModal = ({ isOpen, onClose, initialData, onSubmit }) => {
    const [formData, setFormData] = useState(EMPTY_ITEM);
    const [error, setError] = useState("");

    // When editing, load existing data
    useEffect(() => {
        if (initialData) {
            setFormData({
                ...EMPTY_ITEM,
                ...initialData,
                is_active: initialData.is_active ? 1 : 0,
            });
        } else {
            setFormData(EMPTY_ITEM);
        }
        setError("");
    }, [initialData, isOpen]);

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

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name.trim()) {
            setError("Name is required.");
            return;
        }
        if (formData.price === "" || isNaN(Number(formData.price))) {
            setError("Valid price is required.");
            return;
        }

        const payload = {
            ...formData,
            price: Number(formData.price),
            discount: formData.discount === "" ? 0 : Number(formData.discount),
        };

        // Parent ko final data
        if (typeof onSubmit === "function") {
            onSubmit(payload);
        }

        onClose();
        console.log("payload = ", payload);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData((prev) => ({
                ...prev,
                image_urls: reader.result, // base64 string
            }));
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">
                        {formData.id ? "Edit Menu Item" : "Add New Menu Item"}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 text-2xl leading-none"
                    >
                        ×
                    </button>
                </div>

                {/* Error message */}
                {error && (
                    <div className="mb-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Description
                        </label>
                        <textarea
                            name="descriptions"
                            value={formData.descriptions}
                            onChange={handleChange}
                            rows={3}
                            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring focus:ring-blue-200"
                        />

                        {/* Image Preview (URL or Base64 both chalega) */}
                        {formData.image_urls && (
                            <img
                                src={formData.image_urls}
                                alt="Preview"
                                className="w-28 h-28 object-cover rounded mt-2 border"
                            />
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Price (₹)
                            </label>
                            <input
                                type="number"
                                name="price"
                                step="0.01"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring focus:ring-blue-200"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Discount (₹)
                            </label>
                            <input
                                type="number"
                                name="discount"
                                step="0.01"
                                value={formData.discount}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Category
                        </label>
                        <select
                            name="c_name"
                            value={formData.c_name}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring focus:ring-blue-200"
                        >
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Snacks">Snacks</option>
                            <option value="Dinner">Dinner</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="is_active"
                            name="is_active"
                            checked={formData.is_active === 1}
                            onChange={handleChange}
                            className="h-4 w-4"
                        />
                        <label htmlFor="is_active" className="text-sm">
                            Active
                        </label>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
                        >
                            {formData.id ? "Update Item" : "Add Item"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MenuFormModal;
