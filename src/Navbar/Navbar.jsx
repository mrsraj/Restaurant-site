import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import navLinks from "./Navbar-link";
import { useMyContext } from "../context/AppContext";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    const { Auth } = useMyContext();
    console.log("Auth = ", Auth);


    function HandleLogOut() {
        console.log("LogOut SuccessFully");
        localStorage.removeItem("user");
    }

    return (
        <nav className="bg-[#07bbed] shadow-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-xl font-bold text-red-600">
                    🍽 MyRestaurant
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-6 items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={
                                location.pathname === link.to
                                    ? "bg-[#0c7204] text-white p-1 rounded"
                                    : "text-black p-1"
                            }
                        >
                            {link.label}
                        </Link>
                    ))}



                    {/* Login / Logout Button */}
                    {Auth ? (
                        <button
                            onClick={HandleLogOut}
                            className="block bg-[#ea4d4d] text-white px-4 py-2 rounded hover:bg-red-700 transition text-center"
                        >
                            LogOut
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-[#0c7204] text-white px-4 py-2 rounded hover:bg-[#095b01] transition"
                        >
                            Login
                        </Link>
                    )}
                </div>


                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-2xl focus:outline-none "
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white shadow-lg fixed w-full">
                    <ul className="flex flex-col space-y-2 px-4 py-3 text-center ">
                        {navLinks.map((link) => (
                            <li key={link.to} className="hover:bg-green-400">
                                <Link
                                    to={link.to}
                                    onClick={() => setMenuOpen(false)}
                                    className="block py-2 hover:text-[#181818] transition-colors"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}

                        {/* Mobile Login Button */}
                        {
                            Auth ? (
                                <button
                                    onClick={HandleLogOut}
                                    className="block bg-[#ea4d4d] text-white px-4 py-2 rounded hover:bg-red-700 transition text-center"
                                >
                                    LogOut
                                </button>
                            ) : (
                                <li>
                                    <Link
                                        to="/login"
                                        onClick={() => setMenuOpen(false)}
                                        className="block bg-[#237003] text-white px-4 py-2 rounded hover:bg-[#095b01] transition text-center"
                                    >
                                        LogIn
                                    </Link>
                                </li>
                            )
                        }

                    </ul>
                </div>
            )}
        </nav>
    );
}
