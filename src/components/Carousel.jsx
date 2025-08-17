import { useState } from "react";

export default function Carousel() {
    const images = [
        "https://source.unsplash.com/800x500/?restaurant,food",
        "https://source.unsplash.com/800x500/?pasta",
        "https://source.unsplash.com/800x500/?dessert",
        "https://source.unsplash.com/800x500/?salad",
    ];

    const [current, setCurrent] = useState(0);

    const prevSlide = () => {
        setCurrent(current === 0 ? images.length - 1 : current - 1);
    };

    const nextSlide = () => {
        setCurrent(current === images.length - 1 ? 0 : current + 1);
    };

    return (
        <div className="relative max-w-4xl mx-auto mt-8">
            {/* Image */}
            <img
                src={images[current]}
                alt={`slide-${current}`}
                className="w-full h-72 md:h-96 object-cover rounded-lg shadow-lg"
            />

            {/* Left Arrow */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full hover:bg-opacity-70"
            >
                &#8592;
            </button>

            {/* Right Arrow */}
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full hover:bg-opacity-70"
            >
                &#8594;
            </button>

            {/* Dots */}
            <div className="flex justify-center mt-4 space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${current === index ? "bg-red-600" : "bg-gray-300"}`}
                        onClick={() => setCurrent(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
}
