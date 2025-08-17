import { FiShoppingCart } from "react-icons/fi";
export default function DishCard({ dish }) {

    function handleCart(){
        console.log("Add cart successfully!");
        
    }
    return (
        <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition p-4">
            <img src={dish.image} alt={dish.name} className="w-full h-48 object-cover" />
            <div className="p-4 text-center">
                <h3 className="font-bold text-lg">{dish.name}</h3>
                <p className="text-red-600 font-semibold">${dish.price}</p>
            </div>
            <div onClick={handleCart}
            className="flex justify-center items-center bg-[#63b36a] p-2 rounded-md">
                <FiShoppingCart size={25} className="pr-2" />
                Add to Cart
            </div>
        </div>
    );
}
