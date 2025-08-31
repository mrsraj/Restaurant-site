import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./AdminNavbar/Navbar";
import Dashboard from "./Dashboard/Dashboard";
import Orders from "./AdminPages/Orders";
import Reservations from "./AdminPages/Reservations";
import Menu from "./AdminPages/Menu";
import Gallery from "./Gallery/Gallery";
import Settings from "./Settings/Settings";
// import Message from "./AdminPages/Message";

function AdminCollection() {
    return (
        <div className="flex">
            <Navbar />
            <main className="flex-1 p-6 bg-gray-50 min-h-screen">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/reservations" element={<Reservations />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/settings" element={<Settings />} />
                    {/* <Route path="/message" element={<Message />} /> */}
                </Routes>
            </main>
        </div>
    );
}

export default AdminCollection;
