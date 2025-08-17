import Hero from "../components/Hero";
import ImageGallery from "../Common/ImageGallery";
import Facilities from "../Features/Facilities";
import Career from "../CareersWithUs/Careers";

export default function Home() {
    return (
        <div>
            <Hero />

            {/* Welcome Message */}
            <section className="max-w-6xl mx-auto p-6 text-center">
                <h2 className="text-3xl font-bold mb-4">Welcome to MyRestaurant</h2>
                <p className="text-gray-700 mb-6">
                    Delicious food, cozy atmosphere, and unforgettable dining experiences.
                    Come visit us for a taste of happiness!
                </p>
            </section>

            {/* Features Section */}
            <section className="bg-gray-100 py-10">
                <div className="max-w-6xl mx-auto px-6">
                    <h3 className="text-2xl font-bold text-center mb-6">What Makes Us Special</h3>
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                        <div className="p-4 bg-white shadow rounded">
                            <h4 className="font-semibold text-xl mb-2">Chef-Curated Menu</h4>
                            <p className="text-gray-600">Each dish is crafted with care using fresh, local ingredients by top chefs.</p>
                        </div>
                        <div className="p-4 bg-white shadow rounded">
                            <h4 className="font-semibold text-xl mb-2">Cozy & Elegant Ambience</h4>
                            <p className="text-gray-600">A perfect blend of luxury and comfort — ideal for both casual dining and celebrations.</p>
                        </div>
                        <div className="p-4 bg-white shadow rounded">
                            <h4 className="font-semibold text-xl mb-2">Quick & Friendly Service</h4>
                            <p className="text-gray-600">Our staff is trained to deliver excellence with every visit, every time.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Facilities Section */}
           <Facilities/>

            {/* Work Culture Section */}
            <section className="bg-gray-100 py-10">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h3 className="text-2xl font-bold mb-4">Our Work Culture</h3>
                    <p className="text-gray-700 max-w-2xl mx-auto mb-6">
                        At MyRestaurant, we believe that happy teams create happy customers.
                        We foster an inclusive, growth-focused work environment where creativity and hospitality thrive.
                    </p>
                    <p className="text-gray-600 italic">
                        “We’re not just building a restaurant — we’re building a family.”
                    </p>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-10">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
                    <p className="text-gray-700 max-w-2xl mx-auto">
                        From the moment you walk in, we make it our mission to create a memorable experience —
                        whether you’re here for a casual lunch or a celebration dinner.
                        We promise food that comforts, ambiance that warms, and service that delights.
                    </p>
                </div>
            </section>

            {/* Opening Hours */}
            <section className="py-10">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h3 className="text-2xl font-bold mb-4">Opening Hours</h3>
                    <table className="mx-auto text-left border border-gray-300">
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2 font-medium">Monday - Friday</td>
                                <td className="border px-4 py-2">11:00 AM – 10:00 PM</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-medium">Saturday</td>
                                <td className="border px-4 py-2">12:00 PM – 11:00 PM</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-medium">Sunday</td>
                                <td className="border px-4 py-2">12:00 PM – 9:00 PM</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <ImageGallery />

            {/* Careers Section */}
           <Career/>

            {/* Google Map */}
            <section className="max-w-6xl mx-auto p-6 text-center">
                <div className="mt-8">
                    <iframe
                        title="Google Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.51016345602!2d-122.4194156846818!3d37.7749292797599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c3e4b35bb%3A0x0!2zMzfCsDQ2JzI5LjciTiAxMjLCsDI1JzA3LjkiVw!5e0!3m2!1sen!2sus!4v1675603026573!5m2!1sen!2sus"
                        width="100%"
                        height="300"
                        allowFullScreen
                        loading="lazy"
                        className="rounded-lg shadow-lg"
                    ></iframe>
                </div>
            </section>
        </div>
    );
}
