import { Home, ShoppingCart, Calendar, MenuIcon, Image, Settings } from "lucide-react";

const links = [
    { to: "/", label: "Dashboard", icon: <Home size={18} /> },
    { to: "/orders", label: "Orders", icon: <ShoppingCart size={18} /> },
    { to: "/reservations", label: "Reservations", icon: <Calendar size={18} /> },
    { to: "/menu", label: "Menu", icon: <MenuIcon size={18} /> },
    { to: "/gallery", label: "Gallery", icon: <Image size={18} /> },
    { to: "/settings", label: "Settings", icon: <Settings size={18} /> },
];

export default links;