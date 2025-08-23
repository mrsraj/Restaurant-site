import { NavLink } from "react-router-dom";
import { Home, ShoppingCart, Calendar, MenuIcon, Image, Settings } from "lucide-react";

const Navbar = () => {
    const links = [
        { to: "/", label: "Dashboard", icon: <Home size={18} /> },
        { to: "/orders", label: "Orders", icon: <ShoppingCart size={18} /> },
        { to: "/reservations", label: "Reservations", icon: <Calendar size={18} /> },
        { to: "/menu", label: "Menu", icon: <MenuIcon size={18} /> },
        { to: "/gallery", label: "Gallery", icon: <Image size={18} /> },
        { to: "/settings", label: "Settings", icon: <Settings size={18} /> },
    ];

    return (
        <aside className="w-60 bg-white shadow-lg min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-8 text-green-700">🍽 Admin Panel</h1>
            <nav className="flex flex-col gap-3">
                {links.map(({ to, label, icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-2 rounded-lg transition ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
                            }`
                        }
                    >
                        {icon}
                        {label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Navbar;
