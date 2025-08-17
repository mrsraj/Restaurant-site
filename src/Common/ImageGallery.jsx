import { useState } from "react";

// Inside your component...
export default function ImageGallery() {
    const [showAll, setShowAll] = useState(false);

    const images = [
        "https://images.unsplash.com/photo-1555992336-03a23c06c603",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
        "https://images.unsplash.com/photo-1543352634-4c2b16c7a6c0",
        "https://images.unsplash.com/photo-1541544181040-b3c5c6e6f016",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2f4c"
    ];

    const visibleImages = showAll ? images : images.slice(0, 2);

    return (
        <>
            {/* Image Gallery */}
            <section className="bg-gray-100 py-10">
                <div className="max-w-6xl mx-auto px-6">
                    <h3 className="text-2xl font-bold text-center mb-6">Gallery</h3>

                    {/* Images */}
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {visibleImages.map((src, i) => (
                            <img
                                key={i}
                                src={src}
                                alt={`Gallery ${i + 1}`}
                                className="rounded shadow-lg w-full h-60 object-cover"
                            />
                        ))}
                    </div>

                    {/* Show More Button (visible only on small screens) */}
                    <div className="text-center mt-6 sm:hidden">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            {showAll ? "Show Less" : "Show More"}
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
