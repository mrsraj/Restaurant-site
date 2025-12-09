import { useState, useEffect } from "react";
import { MoreVertical, Edit, Trash2 } from "lucide-react";
import MenuFetching from "../../API/menuapi";
import ModernLoader from "../../Common/ModernLoader";
import MenuFormModal from "../UpdatePages/MenuFormModal";

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cardData, setCardData] = useState([])

    // Modal state (used for both Add & Edit)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null); // null = add mode, id = edit mode

    // Fetch menu data
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                setError(null);

                const finalData = await MenuFetching();

                if (finalData.error) {
                    setError(finalData.error);
                    setMenuItems([]);
                } else {
                    setMenuItems(finalData.data || []);
                    console.log('finalData.data = ', finalData.data);

                }
            } catch (err) {
                setError("Something went wrong while fetching menu.");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    // Calculate percentage off
    const getDiscountPercent = (actual, discounted) => {
        const a = Number(actual);
        const d = Number(discounted);
        if (!a || a <= 0) return 0;
        return Math.round(((a - d) / a) * 100);
    };

    // Open modal in "Add" mode
    // const openAddModal = () => {
    //     setEditingId(null);
    //     setFormItem({
    //         name: "",
    //         actualPrice: "",
    //         discountedPrice: "",
    //         image: "",
    //     });
    //     setIsModalOpen(true);
    // };

    // Open modal in "Edit" mode
    const openEditModal = (item) => {
        setEditingId(item.id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
    };

    // Delete item
    const handleDelete = (id) => {
        setMenuItems((items) => items.filter((item) => item.id !== id));
    };

    return (
        <div className="relative bg-[#dedcdc]">
            <h2 
            className="text-2xl bg-[#1cd8cb] font-bold py-2 mb-1  text-center text-red-500 sticky top-0">
                🍴 Menu Management
            </h2>

            {/* Loader */}
            {loading && (
                <div className="flex justify-center my-6">
                    <ModernLoader />
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="mb-4 text-center text-red-600 text-sm">
                    {error}
                </div>
            )}

            {/* Menu Items Grid */}
            <div className="grid md:grid-cols-3 gap-2 max-h-[calc(100vh-60px)] overflow-y-auto">
                {!loading && menuItems.length === 0 && !error && (
                    <p className="col-span-full text-center text-gray-500 text-sm">
                        No menu items found. Click “Add New Item” to create one.
                    </p>
                )}

                {menuItems.map((item) => (
                    <div
                        key={item.id}
                        className="p-4 bg-white shadow rounded-lg relative flex flex-col"
                    >
                        {/* Item Image */}
                        <img
                            src={item.image || item.image_urls}
                            alt={item.name}
                            className="w-full h-40 object-cover rounded-md mb-3"
                        />

                        {/* Item Info */}
                        <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-gray-400 line-through text-sm">
                                ₹{item.actualPrice ?? item.price}
                            </span>
                            <span className="text-green-600 font-bold text-sm">
                                ₹{item.discountedPrice ?? item.discount}
                            </span>
                            <span className="text-red-500 text-xs font-medium">
                                (
                                {getDiscountPercent(
                                    item.actualPrice ?? item.price,
                                    item.discountedPrice ?? item.discount
                                )}
                                % OFF)
                            </span>
                        </div>

                        {/* 3-dot menu */}
                        <div className="absolute top-3 right-3 group">
                            <button className="p-2 bg-[#1cd8cb] rounded-full shadow hover:bg-gray-100">
                                <MoreVertical size={18} />
                            </button>
                            <div className="absolute right-0 top-7 mt-2 w-32 bg-[#1cd8cb] shadow-lg rounded hidden group-hover:block z-10">
                                <button
                                    onClick={() => openEditModal(item)}
                                    className="flex items-center gap-2 px-3 py-2 w-full hover:bg-green-500 text-sm"
                                >
                                    <Edit size={16} /> Update
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="flex items-center gap-2 px-3 py-2 w-full hover:bg-green-500 text-sm text-red-600"
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
                // onClick={openAddModal}
                className="fixed top-2 right-3 w-[120px] h-[40px] flex items-center justify-center
                 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 text-sm"
            >
                Add New Item
            </button>

            {/* Modal for Add / Edit Item */}
            {isModalOpen && (
                <MenuFormModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    initialData={editingId ? menuItems.find(i => i.id === editingId) : null}
                    onSubmit={handleSaveItem} 
                />)}
        </div>
    );
};

export default Menu;
