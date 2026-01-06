import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useUpdateMenuItem from "../../API/useUpdateMenuItem";
import getCategory from "../../API/getCategory";

const EMPTY_ITEM = {
    name: "",
    descriptions: "",
    price: "",
    discount: "",
    category_id: "",
    is_active: 1,
    image_file: null,
    image_preview: "",
    old_image: "", // ✅
};

const UpdateMenu = ({ isOpen, onClose, editItem, refresh, setRefresh }) => {
    const [formData, setFormData] = useState(EMPTY_ITEM);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const { updating, updateMenuItem } = useUpdateMenuItem(setError);

    /* Populate form for UPDATE only */
    useEffect(() => {
        if (editItem) {
            setFormData({
                name: editItem.name || "",
                descriptions: editItem.descriptions || "",
                price: editItem.price || "",
                discount: editItem.discount || "",
                category_id: editItem.cat_id || "",
                is_active: editItem.is_active ?? 1,
                image_file: null,
                image_preview: editItem.image_urls || "",
                old_image: editItem.image_urls || "", // ✅ ADD THIS
            });
        }
    }, [editItem]);


    useEffect(() => {
        const fetchCategories = async () => {
            const res = await getCategory();
            if (Array.isArray(res)) {
                setCategories(res);
            }
        };
        fetchCategories();
    }, []);

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

        const MAX_SIZE = 1 * 1024 * 1024; // 1MB

        if (file.size > MAX_SIZE) {
            toast.error("Image must be less than 1MB");
            e.target.value = ""; // reset file input
            return;
        }

        setFormData((prev) => ({
            ...prev,
            image_file: file,
            image_preview: URL.createObjectURL(file),
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validation
        if (!formData.name.trim()) {
            return setError("Name is required");
        }

        if (!formData.price || Number(formData.price) <= 0) {
            return setError("Valid price is required");
        }

        const data = new FormData();
        data.append("name", formData.name);
        data.append("descriptions", formData.descriptions);
        data.append("price", formData.price);
        data.append("discount", formData.discount || 0);
        data.append("category_id", formData.category_id);
        data.append("is_active", formData.is_active);

        // ✅ If new image selected
        if (formData.image_file) {
            data.append("image", formData.image_file);

            // ✅ Send old image name so backend can delete it
            data.append("old_image", formData.old_image);
        }

        try {
            setLoading(true);
            const res = await updateMenuItem(editItem.id, data);
            if (res.success = "true") {
                setRefresh(!refresh);
                onClose();
            }
        } catch (err) {
            toast.error(err.message || "Failed to update menu item");
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
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.c_name}
                            </option>
                        ))}
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

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />

                    {formData.image_preview && (
                        <img
                            src={formData.image_preview}
                            alt="Preview"
                            className="w-24 h-24 object-cover rounded"
                        />
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full px-4 py-2 rounded text-white
                       ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
                    >
                        {loading ? "Updating..." : "Update Item"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateMenu;
