import Carousel from "../components/Carousel";
import React, { lazy, Suspense } from "react";
const ImageGallery = lazy(() => import("../Common/ImageGallery"));
const Career = lazy(() => import("../CareersWithUs/Careers"));

export default function About() {
    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">About Us</h2>
            <p className="text-gray-700 mb-6">
                At MyRestaurant, we believe food is more than just a meal — it’s an experience.
                Our chefs craft delicious dishes using the freshest ingredients, served in a warm, inviting atmosphere.
            </p>
            <Carousel />


             {/* Image Gallery + Careers */}
            <Suspense fallback={<div className="text-center py-10">Loading Gallery & Careers...</div>}>
                <ImageGallery />
                <Career />
            </Suspense>

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
