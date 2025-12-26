import { useState, useEffect } from "react";
import { useMyContext } from "../context/AppContext";
import DishCard from "../Common/DishCard";
import CategoryFilter from "../components/CategoryFilter";
import { FiFilter } from "react-icons/fi";
import MenuFetching from "../API/menuapi";
import CartPage from "./CartPage";
import ModernLoader from "../Common/ModernLoader";
import OrderStatusModal from "../Features/OrderStatusCard";

import Payment from "../payment/Payment";

export default function Menu() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openModal, setOpenModal] = useState(false); // ✅ for order status modal
  const [loading, setLoading] = useState(true);

  const {invoiceId, setInvoiceId} = useMyContext();
  // Scroll to top on first render
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Check order exists in localStorage
  useEffect(() => {
    const savedInvoice = localStorage.getItem("invoice_id");
    if (savedInvoice) setInvoiceId(savedInvoice);
  }, []);

  // Fetch menu data
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const finalData = await MenuFetching();

      if (finalData.error) {
        setError(finalData.error);
        setLoading(false);
        return;
      }

      setData(finalData.data || []);
      setLoading(false);
    }

    fetchData();
  }, []);

  const categories = ["All", ...new Set(data.map((item) => item.c_name))];
  const [category, setCategory] = useState("All");
  const [showFilter, setShowFilter] = useState(false);

  const filteredMenu =
    category === "All"
      ? data
      : data.filter((item) => item.c_name === category);

  return (
    <div className="max-w-7xl mx-auto p-2 md:flex gap-6 bg-[#d6d5d5] relative">
      {/* Mobile Filter Button */}
      <div className="md:hidden flex justify-end mb-4">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="p-2 border rounded-md flex items-center gap-2 bg-white"
        >
          <FiFilter size={20} />
          Filter
        </button>
      </div>

      {/* Sidebar Filter */}
      <div
        className={`md:block fixed md:static top-0 left-0 h-full bg-white shadow-md transform ${showFilter ? "translate-x-0" : "-translate-x-full"
          } transition-transform md:translate-x-0 w-64 p-4 overflow-auto z-20`}
      >
        <CategoryFilter
          categories={categories}
          current={category}
          setCategory={(cat) => {
            setCategory(cat);
            setShowFilter(false);
          }}
        />
      </div>

      {/* Dishes Grid */}
      <div className="flex-1">
        <div className="grid gap-3 md:grid-cols-3 sm:grid-cols-2 overflow-auto max-h-screen">
          {error ? (
            <p className="text-red-500 text-center col-span-full">
              Failed to load menu. Please try again.
            </p>
          ) : loading ? (
            <div className="col-span-full flex justify-center items-center py-10">
              <ModernLoader />
            </div>
          ) : filteredMenu.length === 0 ? (
            <p className="text-gray-500 text-center col-span-full">
              No menu items found
            </p>
          ) : (
            filteredMenu.map((dish) => <DishCard key={dish.id} dish={dish} />)
          )}
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-30"
      >
        ↑
      </button>

      {/* Open Cart Button */}
      <button
        onClick={() => setOpenCart(true)}
        className="fixed bottom-4 right-20 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg z-30"
      >
        Open Cart
      </button>

      {/* Track Order Floating Button – only if order exists */}
      {invoiceId && (
        <button
          onClick={() => setOpenModal(true)}
          className="fixed bottom-20 right-4 bg-slate-900 text-white p-3 rounded-full shadow-lg z-30 hover:bg-slate-800"
          title="Track your order"
        >
          🧾
        </button>
      )}

      {/* Order Status Modal */}
      <OrderStatusModal
        invoiceId={invoiceId}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />

      <Payment/>

      {/* Cart Modal/Page */}
      <CartPage isOpen={openCart} onClose={() => setOpenCart(false)} />
    </div>
  );
}
