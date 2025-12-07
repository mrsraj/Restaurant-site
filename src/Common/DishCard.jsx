import React, { useEffect, useState } from "react";
import { replace, useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import toast from "react-hot-toast";
import { useMyContext } from "../context/AppContext";
export default function DishCard({ dish }) {
    const [cartQty, setCartQty] = useState(0);
    const { Auth } = useMyContext();
    const navigate = useNavigate();

    // On mount, read existing qty from localStorage
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItem = cart.find((item) => item.id === dish.id);
        if (existingItem) {
            setCartQty(existingItem.qty);
        }
    }, [dish.id]);

    // calculate discounted price
    const finalPrice = dish.discount
        ? (dish.price - dish.discount).toFixed(2)
        : dish.price;

    function handleAddToCart() {
        if (!Auth) { 
            navigate('/login', { replace: true }); 
            return;
        }

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItemIndex = cart.findIndex((item) => item.id === dish.id);

        if (existingItemIndex !== -1) {
            // already exists → increase qty
            cart[existingItemIndex].qty += 1;
            setCartQty(cart[existingItemIndex].qty);
        } else {
            // add new item
            const newItem = {
                id: dish.id,
                name: dish.name,
                price: dish.price,
                finalPrice: Number(finalPrice),
                qty: 1,
            };
            cart.push(newItem);
            setCartQty(1);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        toast.success(`Added to cart! ₹${finalPrice} — ${dish.name}`);
    }

    function updateQty(change) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItemIndex = cart.findIndex((item) => item.id === dish.id);

        if (existingItemIndex === -1) return;

        const newQty = cart[existingItemIndex].qty + change;

        if (newQty <= 0) {
            // remove from cart
            cart.splice(existingItemIndex, 1);
            setCartQty(0);
            toast.error("Item removed from cart");
        } else {
            cart[existingItemIndex].qty = newQty;
            setCartQty(newQty);
            toast.success(`Quantity updated: ${newQty}`);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    return (
        <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition p-2 bg-[#fff] cursor-pointer">
            {/* Dish Image */}
            <img
                src={"./images/biryani.jpg"}
                alt={dish.name}
                className="w-full h-60 object-cover"
            />

            <div className="p-4 text-center">
                <h3 className="font-bold text-xl">{dish.name}</h3>

                {/* Description */}
                <p className="text-gray-600 mt-1">{dish.descriptions}</p>

                {/* Price & Discount */}
                <div className="mt-2">
                    {dish.discount > 0 ? (
                        <p className="text-[#07e8f0] font-semibold text-lg">
                            ₹{finalPrice}{" "}
                            <span className="line-through text-gray-500 text-sm">
                                ₹{dish.price}
                            </span>
                        </p>
                    ) : (
                        <p className="text-[#07e8f0] font-semibold text-lg">₹{dish.price}</p>
                    )}
                </div>
            </div>

            {/* Add to Cart / Qty Controls */}
            <div
                className="flex justify-center items-center bg-green-600 hover:bg-green-700
                    active:scale-95 text-white px-4  rounded-lg cursor-pointer transition
                    shadow-md hover:shadow-lg"
            >
                {cartQty > 0 ? (
                    // Show - qty + controls
                    <div className="flex items-center gap-4">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                updateQty(-1);
                            }}
                            className="px-3 py-1 text-2xl font-bold flex items-center justify-center 
                                      rounded-md transition"
                        >
                            -
                        </button>
                        <span className="text-lg font-semibold">{cartQty}</span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                updateQty(1);
                            }}
                            className="px-3 py-1 text-2xl font-bold flex items-center justify-center 
                                     hover:bg-green-700 rounded-md transition"
                        >
                            +
                        </button>

                    </div>
                ) : (
                    // Show Add to Cart button
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart();
                        }}
                        className="flex items-center py-2"
                    >
                        <FiShoppingCart size={20} className="mr-2" />
                        Add to Cart
                    </div>
                )}
            </div>
        </div>
    );
}
