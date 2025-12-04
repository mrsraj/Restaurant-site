

const populardishes = [
    {
        name: "Cheese Pizza",
        img: "https://images.pexels.com/photos/4109084/pexels-photo-4109084.jpeg"
    },
    {
        name: "Burger Meal",
        img: "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg"
    },
    {
        name: "Pasta Bowl",
        img: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg"
    },
    {
        name: "Sushi Platter",
        img: "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg"
    },
    {
        name: "Fries & Snacks",
        img: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg"
    },
    {
        name: "Cold Coffee",
        img: "https://images.pexels.com/photos/296888/pexels-photo-296888.jpeg"
    },
    {
        name: "Pasta Bowl",
        img: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg"
    },
    {
        name: "Sushi Platter",
        img: "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg"
    },
    {
        name: "Fries & Snacks",
        img: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg"
    },
    {
        name: "Cold Coffee",
        img: "https://images.pexels.com/photos/296888/pexels-photo-296888.jpeg"
    },
    {
        name: "Pasta Bowl",
        img: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg"
    },
    {
        name: "Sushi Platter",
        img: "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg"
    },
    {
        name: "Fries & Snacks",
        img: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg"
    },
    {
        name: "Cold Coffee",
        img: "https://images.pexels.com/photos/296888/pexels-photo-296888.jpeg"
    }
];


export default function PopularDishes() {
    return (
        <section className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Popular Dishes</h2>

            <div className="flex space-x-6 overflow-x-auto scrollbar-hide py-2 px-1">
                {populardishes.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center min-w-[100px]"
                    >
                        <img
                            src={item.img}
                            alt={item.name}
                            className="w-24 h-24 rounded-full object-cover shadow-md border-4 border-white"
                        />
                        <p className="mt-2 text-sm font-semibold text-gray-700 whitespace-nowrap">
                            {item.name}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
