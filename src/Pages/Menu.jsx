import { useState, useEffect } from "react";
import DishCard from "../Common/DishCard";
import CategoryFilter from "../components/CategoryFilter";
import { FiFilter } from "react-icons/fi";
import MenuFetching from "../API/menuapi";

export default function Menu() {

  const [data, setData] = useState([]);

  useEffect(() => {
    window.scrollTo(
      {
        top: 0,
        behavior: 'smooth'
      });
  })

  useEffect(() => {
    async function fetchData() {
      const finalData = await MenuFetching();
      console.log("finalData = ", finalData.data);
      setData(finalData.data);
    }
    fetchData();
  }, []);


  const categories = ["All", ...new Set(data.map((item) => item.c_name))];
  const [category, setCategory] = useState("All");
  const [showFilter, setShowFilter] = useState(false);

  const filteredMenu = category === "All" ? data : data.filter((item) => item.c_name === category);

  return (
    <div className="max-w-7xl mx-auto p-4 md:flex gap-6 bg-[#d6d5d5]">
      {/* Mobile Filter Button */}
      <div className="md:hidden flex justify-end mb-4">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="p-2 border rounded-md flex items-center gap-2"
        >
          <FiFilter size={20} />
          Filter
        </button>
      </div>

      {/* Sidebar Filter */}
      <div
        className={`md:block fixed md:static top-0 left-0 h-full bg-white shadow-md transform ${showFilter ? "translate-x-0" : "-translate-x-full"
          } transition-transform md:translate-x-0 w-64 p-4 overflow-auto`}
      >
        <CategoryFilter
          categories={categories}
          current={category}
          setCategory={(cat) => { setCategory(cat); setShowFilter(false); }
          }
        />
      </div>

      {/* Dishes Grid */}
      <div className="flex-1">
        {/* <h2 className="text-3xl font-bold mb-6 text-center">Our Menu</h2> */}
        <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2 overflow-auto max-h-screen ">
          {filteredMenu.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      </div>
    </div>
  );
}
