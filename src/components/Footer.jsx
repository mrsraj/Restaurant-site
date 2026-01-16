import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* About */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">🍽 MyRestaurant</h2>
                    <p className="text-gray-400 text-sm">
                        Experience fine dining like never before. Fresh ingredients, exquisite flavors, and an unforgettable atmosphere.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li><Link to="/" className="hover:text-red-500">Home</Link></li>
                        <li><Link to="/menu" className="hover:text-red-500">Menu</Link></li>
                        <li><Link to="/booking" className="hover:text-red-500">Book a Table</Link></li>
                        <li><Link to="/about" className="hover:text-red-500">About Us</Link></li>
                        <li><Link to="/contact" className="hover:text-red-500">Contact</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Contact</h3>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li className="flex items-center gap-2">
                            <FaPhoneAlt /> +91 9876543210
                        </li>
                        <li className="flex items-center gap-2">
                            <FaMapMarkerAlt /> 123 Food Street, City, India
                        </li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            className="bg-gray-700 p-2 rounded-full text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        >
                            <FaFacebookF size={16} />
                        </a>

                        <a
                            href="https://www.instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="bg-gray-700 p-2 rounded-full text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        >
                            <FaInstagram size={16} />
                        </a>

                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter"
                            className="bg-gray-700 p-2 rounded-full text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        >
                            <FaTwitter size={16} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} MyRestaurant — All Rights Reserved
            </div>
        </footer>
    );
}
