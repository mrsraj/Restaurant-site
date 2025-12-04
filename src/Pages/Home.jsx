import React, { lazy, Suspense } from "react";

// Lazy load components
const Hero = lazy(() => import("../components/Hero"));
const Facilities = lazy(() => import("../Features/Facilities"));
const PopularDishes = lazy(() => import("./popularDishes"));
const FeaturesSection = lazy(() => import("../Features/FeaturesSection"));
const WorkCulture = lazy(() => import("./WorkCulture"));
const WhyChooseUs = lazy(()=>import("./WhyChooseUs"));
const OpeningHours = lazy(()=>import("./OpeningHours"))

export default function Home() {
    return (
        <div>
            {/* Hero Section */}
            <Suspense fallback={<div className="text-center py-10">Loading Hero...</div>}>
                <Hero />
            </Suspense>

            {/* Popular Dishes */}
            <Suspense fallback={<div className="text-center py-10">Loading Popular Dishes...</div>}>
                <PopularDishes />
            </Suspense>

            {/* Features Section */}
            <Suspense fallback={<div className="text-center py-10">Loading Hero...</div>}>
                <FeaturesSection />
            </Suspense>

            {/* Facilities Section */}
            <Suspense fallback={<div className="text-center py-10">Loading Facilities...</div>}>
                <Facilities />
            </Suspense>

            {/* Work Culture Section */}
            <WorkCulture />

            {/* Why Choose Us */}
            <WhyChooseUs/>

            {/* Opening Hours */}
            <OpeningHours/>
            
        </div>
    );
}
