import { useState } from "react";
import { Plus, MoreVertical, Edit, Trash2 } from "lucide-react";

const Menu = () => {
    const [menuItems, setMenuItems] = useState([
        {
            id: 1,
            name: "Margherita Pizza",
            actualPrice: 399,
            discountedPrice: 299,
            image:
                "https://images.unsplash.com/photo-1601924582975-7ec9be2b5c7b?auto=format&fit=crop&w=400&q=80",
        },
        {
            id: 2,
            name: "Veg Burger",
            actualPrice: 199,
            discountedPrice: 149,
            image:
                "https://images.unsplash.com/photo-1606756790138-05f3e7e18f57?auto=format&fit=crop&w=400&q=80",
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newItem, setNewItem] = useState({
        name: "",
        actualPrice: "",
        discountedPrice: "",
        image: "",
    });

    // Calculate percentage off
    const getDiscountPercent = (actual, discounted) => {
        return Math.round(((actual - discounted) / actual) * 100);
    };

    // Add new menu item
    const handleAddItem = () => {
        if (!newItem.name || !newItem.actualPrice || !newItem.discountedPrice || !newItem.image)
            return;

        setMenuItems([
            ...menuItems,
            {
                id: Date.now(),
                ...newItem,
                actualPrice: Number(newItem.actualPrice),
                discountedPrice: Number(newItem.discountedPrice),
            },
        ]);
        setNewItem({ name: "", actualPrice: "", discountedPrice: "", image: "" });
        setIsModalOpen(false);
    };

    // Delete item
    const handleDelete = (id) => {
        setMenuItems(menuItems.filter((item) => item.id !== id));
    };

    // Update item (basic modal or inline form can be added later)
    const handleUpdate = (id) => {
        const item = menuItems.find((m) => m.id === id);
        const updatedName = prompt("Enter new name:", item.name);
        const updatedActual = prompt("Enter new actual price:", item.actualPrice);
        const updatedDiscount = prompt("Enter new discounted price:", item.discountedPrice);
        if (updatedName && updatedActual && updatedDiscount) {
            setMenuItems(
                menuItems.map((m) =>
                    m.id === id
                        ? {
                            ...m,
                            name: updatedName,
                            actualPrice: Number(updatedActual),
                            discountedPrice: Number(updatedDiscount),
                        }
                        : m
                )
            );
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-center">🍴 Menu Management</h2>

            {/* Menu Items Grid */}
            <div className="grid md:grid-cols-3 gap-4">
                {menuItems.map((item) => (
                    <div
                        key={item.id}
                        className="p-4 bg-white shadow rounded-lg relative flex flex-col"
                    >
                        {/* Item Image */}
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-40 object-cover rounded-md mb-3"
                        />

                        {/* Item Info */}
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-400 line-through">
                                ₹{item.actualPrice}
                            </span>
                            <span className="text-green-600 font-bold">
                                ₹{item.discountedPrice}
                            </span>
                            <span className="text-red-500 text-sm font-medium">
                                ({getDiscountPercent(item.actualPrice, item.discountedPrice)}% OFF)
                            </span>
                        </div>

                        {/* 3-dot menu */}
                        <div className="absolute top-3 right-3 group">
                            <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
                                <MoreVertical size={18} />
                            </button>
                            <div className="absolute right-0 top-7 mt-2 w-32 bg-white shadow-lg rounded hidden group-hover:block">
                                <button
                                    onClick={() => handleUpdate(item.id)}
                                    className="flex items-center gap-2 px-3 py-2 w-full hover:bg-gray-100"
                                >
                                    <Edit size={16} /> Update
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="flex items-center gap-2 px-3 py-2 w-full hover:bg-gray-100 text-red-600"
                                >
                                    <Trash2 size={16} /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Floating Add Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed top-2 right-3 w-[100px] h-[40px] flex items-center justify-center
                 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 text-sm"
            >
                Add New Item
            </button>


            {/* Modal for Add Item */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h3 className="text-xl font-bold mb-4">Add New Menu Item</h3>
                        <input
                            type="text"
                            placeholder="Item Name"
                            value={newItem.name}
                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                            className="border p-2 w-full mb-3 rounded"
                        />
                        <input
                            type="number"
                            placeholder="Actual Price"
                            value={newItem.actualPrice}
                            onChange={(e) =>
                                setNewItem({ ...newItem, actualPrice: e.target.value })
                            }
                            className="border p-2 w-full mb-3 rounded"
                        />
                        <input
                            type="number"
                            placeholder="Discounted Price"
                            value={newItem.discountedPrice}
                            onChange={(e) =>
                                setNewItem({ ...newItem, discountedPrice: e.target.value })
                            }
                            className="border p-2 w-full mb-3 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={newItem.image}
                            onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                            className="border p-2 w-full mb-3 rounded"
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 border rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddItem}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Menu;
