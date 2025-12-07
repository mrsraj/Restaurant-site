function CategoryFilter({ categories, current, setCategory }) {
    return (
        <div className="flex flex-col justify-start space-y-3 p-2 bg-white rounded-lg">
            <h3 className="text-lg font-semibold mb-2 border-b pb-2">Categories</h3>

            {categories.map((cat) => (
                <label
                    key={cat}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition 
                     ${current === cat ? "bg-red-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                >
                    {/* Checkbox */}
                    <input
                        type="checkbox"
                        checked={current === cat}
                        onChange={() => setCategory(cat)}
                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />

                    {/* Category Name */}
                    <span className="text-sm font-medium">
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </span>
                </label>
            ))}
        </div>
    );
}

export default CategoryFilter;
