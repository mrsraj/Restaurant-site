import React, { useEffect, useState } from "react";
import getCategory from "../../API/getCategory";

const EMPTY_ITEM = {
    id: null,
    name: "",
    descriptions: "",
    image_urls: null, // 🔑 file object
    price: "",
    discount: "",
    c_name: "",
    custom_category: "",
    is_active: 1,
};

const AddMenuItemForm = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState(EMPTY_ITEM);
    const [error, setError] = useState("");
    const [categories, setCategories] = useState([]);
    const [showCatField, setCatField] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await getCategory();
            if (Array.isArray(res)) {
                setCategories(res);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;

        setFormData((prev) => {
            const updated = {
                ...prev,
                [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
            };

            if (name === "c_name") {
                setCatField(value === "Other");
                if (value !== "Other") {
                    updated.custom_category = "";
                }
            }

            return updated;
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                image_urls: file,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        // Validation
        if (!formData.name.trim()) {
            setError("Name is required.");
            return;
        }

        if (!formData.price || isNaN(formData.price)) {
            setError("Valid price is required.");
            return;
        }

        if (
            formData.c_name === "Other" &&
            !formData.custom_category.trim()
        ) {
            setError("Custom category is required.");
            return;
        }

        const finalCategory =
            formData.c_name === "Other"
                ? formData.custom_category
                : formData.c_name;

        // ✅ FormData for multer
        const data = new FormData();
        data.append("name", formData.name);
        data.append("descriptions", formData.descriptions);
        data.append("price", formData.price);
        data.append("discount", formData.discount || 0);
        data.append("c_name", finalCategory);
        data.append("is_active", formData.is_active);

        if (formData.image_urls) {
            data.append("image", formData.image_urls); // 🔑 must match multer field
        }

        if (typeof onSubmit === "function") {
            onSubmit(data);
        }

        console.log([...data.entries()]);
        

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-auto p-6">

                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Add New Menu Item</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-600 hover:text-black text-2xl"
                    >
                        ×
                    </button>
                </div>

                {error && (
                    <div className="mb-3 text-sm text-red-600">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2"
                    />

                    <textarea
                        name="descriptions"
                        placeholder="Description"
                        value={formData.descriptions}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2"
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full border rounded-md px-3 py-2"
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2"
                    />

                    <input
                        type="number"
                        name="discount"
                        placeholder="Discount"
                        value={formData.discount}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2"
                    />

                    <select
                        name="c_name"
                        value={formData.c_name}
                        onChange={handleChange}
                        className="w-full min-h-[44px] px-3 py-2 text-sm sm:text-base border border-gray-300
                        rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.c_name}>
                                {cat.c_name}
                            </option>
                        ))}
                        <option value="Other">Other</option>
                    </select>


                    {showCatField && (
                        <input
                            type="text"
                            name="custom_category"
                            placeholder="Custom Category"
                            value={formData.custom_category}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2"
                        />
                    )}

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="is_active"
                            checked={formData.is_active === 1}
                            onChange={handleChange}
                        />
                        Active
                    </label>

                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                            Add Item
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddMenuItemForm;
