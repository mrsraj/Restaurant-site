import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./AdminNavbar/Navbar";
import Dashboard from "./Dashboard/Dashboard";
import Orders from "./AdminPages/Orders";
import Reservations from "./AdminPages/Reservations";
import Menu from "./AdminPages/Menu";
import Gallery from "./Gallery/Gallery";
import Settings from "./Settings/Settings";
import NotFound from "../Common/DefaultComponent";
// import Message from "./AdminPages/Message";

function AdminCollection() {
    return (
        <div className="flex">
            <Navbar />
            <main className="flex-1 p-6 bg-gray-50 min-h-screen">
                <Routes>
                    <Route path="/admin" element={<Dashboard />} />
                    <Route path="/admin/orders" element={<Orders />} />
                    <Route path="/admin/reservations" element={<Reservations />} />
                    <Route path="/admin/menu" element={<Menu />} />
                    <Route path="/admin/gallery" element={<Gallery />} />
                    <Route path="/admin/settings" element={<Settings />} />
                    {/* <Route path="/message" element={<Message />} /> */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </div>
    );
}

export default AdminCollection;
