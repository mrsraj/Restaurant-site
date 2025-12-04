const features = [
    {
        title: "Chef-Curated Menu",
        description:
            "Each dish is crafted with care using fresh, local ingredients by top chefs.",
        img: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
    },
    {
        title: "Cozy & Elegant Ambience",
        description:
            "A perfect blend of luxury and comfort — ideal for both casual dining and celebrations.",
        img: "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg"
    },
    {
        title: "Quick & Friendly Service",
        description:
            "Our staff is trained to deliver excellence with every visit, every time.",
        img: "https://images.pexels.com/photos/3771833/pexels-photo-3771833.jpeg"
    }
];


function FeaturesSection() {
    return (
        <section className="bg-gray-100 py-12">
            <div className="max-w-6xl mx-auto px-6">
                <h3 className="text-3xl font-bold text-center mb-10">
                    What Makes Us Special
                </h3>

                <div className="space-y-14">
                    {features.map((item, index) => (
                        <div
                            key={index}
                            className={`grid md:grid-cols-2 gap-8 items-center ${
                                index % 2 !== 0 ? "md:flex-row-reverse" : ""
                            }`}
                        >
                            {/* Image */}
                            <div className="w-full h-64 rounded-xl overflow-hidden shadow-lg">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div>
                                <h4 className="text-2xl font-semibold mb-3">
                                    {item.title}
                                </h4>
                                <p className="text-gray-700 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;