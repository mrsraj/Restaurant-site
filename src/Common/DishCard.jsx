import { FiShoppingCart } from "react-icons/fi";

export default function DishCard({ dish }) {

    function handleCart() {
        console.log("Added to cart successfully!");
        alert("Added to cart successfully!");
    }

    // calculate discounted price
    const finalPrice = dish.discount
        ? (dish.price - dish.discount).toFixed(2)
        : dish.price;

    return (
        <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition p-4 bg-[#fff] cursor-pointer">

            {/* Dish Image */}
            <img
                src={'./images/biryani.jpg'}
                alt={dish.name}
                className="w-full h-60 object-cover"
            />

            <div className="p-4 text-center">

                {/* Dish Name */}
                <h3 className="font-bold text-xl">{dish.name}</h3>

                {/* Category Name */}
                {/* <p className="text-sm text-gray-500">{dish.c_name}</p> */}

                {/* Description */}
                <p className="text-gray-600 mt-1">{dish.descriptions}</p>

                {/* Price & Discount */}
                <div className="mt-2">
                    {dish.discount > 0 ? (
                        <>
                            <p className="text-[#07e8f0] font-semibold text-lg">₹{finalPrice}{" "}
                                <span className="line-through text-gray-500 text-sm">₹{dish.price}</span>
                            </p>
                            
                        </>
                    ) : (
                        <p className="text-[#07e8f0] font-semibold text-lg">₹{dish.price}</p>
                    )}
                </div>

            </div>

            {/* Add to Cart Button */}
            <div
                onClick={handleCart}
                className="flex justify-center items-center bg-[#63b36a] 
                text-white p-2 rounded-md cursor-pointer hover:bg-green-600 transition relative bottom- -4"
            >
                <FiShoppingCart size={22} className="mr-2" />
                Add to Cart
            </div>

        </div>
    );
}
