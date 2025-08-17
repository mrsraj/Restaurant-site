import Carousel from "../components/Carousel";

export default function About() {
    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">About Us</h2>
            <p className="text-gray-700 mb-6">
                At MyRestaurant, we believe food is more than just a meal — it’s an experience.
                Our chefs craft delicious dishes using the freshest ingredients, served in a warm, inviting atmosphere.
            </p>
            <Carousel />
        </div>
    );
}
