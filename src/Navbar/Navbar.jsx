import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import navLinks from "./Navbar-link";
import { useMyContext } from "../context/AppContext";
import { useLogout } from "../Authentication/LogOut";

export default function Navbar() {
    const location = useLocation();

    const { Auth, setAuth } = useMyContext();
    console.log("Auth = ", Auth);
    const { logout, menuOpen, setMenuOpen } = useLogout();

    return (
        <nav className="sticky top-0 z-50 bg-gray-50 backdrop-blur border-b border-slate-300">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-lg font-semibold text-slate-900"
                >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500 text-white shadow-sm">
                        🍽
                    </span>
                    <span className="tracking-tight text-2xl text-blue-600">
                        My<span className="text-green-400 font-bold text-2xl">Restaurant</span>
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={
                                (location.pathname === link.to
                                    ? "bg-sky-500 text-white shadow-sm "
                                    : "text-slate-700 hover:text-sky-600 hover:bg-slate-100 ") +
                                "text-sm font-medium px-3 py-2 rounded-full transition-colors duration-200"
                            }
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* Login / Logout Button */}
                    {Auth ? (
                        <button
                            onClick={logout}
                            className="ml-2 inline-flex items-center rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-1 transition"
                        >
                            Log out
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="ml-2 inline-flex items-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-1 transition"
                        >
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden inline-flex items-center justify-center rounded-full p-2 text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur border-t border-slate-200 shadow-lg">
                    <ul className="flex flex-col space-y-1 px-4 py-3">
                        {navLinks.map((link) => (
                            <li key={link.to}>
                                <Link
                                    to={link.to}
                                    onClick={() => setMenuOpen(false)}
                                    className={
                                        (location.pathname === link.to
                                            ? "bg-sky-500 text-white shadow-sm "
                                            : "text-slate-700 hover:text-sky-600 hover:bg-slate-100 ") +
                                        "block w-full text-sm font-medium px-3 py-2 rounded-xl text-left transition-colors duration-200"
                                    }
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}

                        {/* Mobile Login / Logout */}
                        {Auth ? (
                            <li className="pt-2 border-t border-slate-200 mt-2">
                                <button
                                    onClick={logout}
                                    className="w-full block bg-rose-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm hover:bg-rose-600 transition"
                                >
                                    Log out
                                </button>
                            </li>
                        ) : (
                            <li className="pt-2 border-t border-slate-200 mt-2">
                                <Link
                                    to="/login"
                                    onClick={() => setMenuOpen(false)}
                                    className="w-full block bg-emerald-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold text-center shadow-sm hover:bg-emerald-600 transition"
                                >
                                    Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
}
