import { NavLink, useNavigate } from "react-router-dom";
import { startTransition } from "react";
import { Home, ShoppingCart, Calendar, MenuIcon, Image, Settings, MessageCircle, LogOut } from "lucide-react";
import { useMyContext } from "../../context/AppContext";

const Navbar = () => {
    const navigate = useNavigate();
    const { setUser,setAuth } = useMyContext();

    const links = [
        { to: "/admin/dashboard", label: "Dashboard", icon: <Home size={18} /> },
        { to: "/admin/orders", label: "Orders", icon: <ShoppingCart size={18} /> },
        { to: "/admin/reservations", label: "Reservations", icon: <Calendar size={18} /> },
        { to: "/admin/menu", label: "Menu", icon: <MenuIcon size={18} /> },
        { to: "/admin/gallery", label: "Gallery", icon: <Image size={18} /> },
        { to: "/admin/message", label: "Message", icon: <MessageCircle size={18} /> },
        { to: "/admin/settings", label: "Settings", icon: <Settings size={18} /> },
    ];

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser({});
        setAuth('');
        startTransition(() => {
          navigate("/");
        });
    };

    return (
        <aside className="w-60 bg-gradient-to-r from-white to-[#43b3eb] shadow-lg min-h-screen p-4 flex flex-col border-r-2 border-gray-500">
            <h1 className="text-2xl font-bold mb-8 text-green-700 ">🍽 Admin Panel</h1>

            <nav className="flex-1 flex flex-col gap-3">
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
                        <span>{label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="mt-6">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-700 hover:bg-red-300"
                >
                    <LogOut size={18} />
                    <span className="text-red-600">Log Out</span>
                </button>
            </div>
        </aside>
    );
};

export default Navbar;
