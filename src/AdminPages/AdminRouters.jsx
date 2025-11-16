import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./AdminNavbar/Navbar";
import Dashboard from "./Dashboard/Dashboard";
import Orders from "./AdminPages/Orders";
import Reservations from "./AdminPages/Reservations";
import Menu from "./AdminPages/Menu";
import Gallery from "./Gallery/Gallery";
import Settings from "./Settings/Settings";
import NotFound from "../Common/DefaultComponent";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
// import Message from "./AdminPages/Message";

function AdminCollection() {
    return (
        <div className="flex">
            <Navbar />
            <main className="flex-1 p-6 bg-gray-50 min-h-screen">
                <Routes>
                    <Route
                        path="/admin/dashboard"
                        element={
                            <ProtectedRoute allowedRoles={["admin"]}>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/"
                        element={
                            <ProtectedRoute allowedRoles={["admin"]}>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin/orders"
                        element={
                            <ProtectedRoute allowedRoles={["admin"]}>
                                <Orders />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin/reservations"
                        element={
                            <ProtectedRoute allowedRoles={["admin"]}>
                                <Reservations />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin/menu"
                        element={
                            <ProtectedRoute allowedRoles={["admin"]}>
                                <Menu />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin/gallery"
                        element={
                            <ProtectedRoute allowedRoles={["admin"]}>
                                <Gallery />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin/settings"
                        element={
                            <ProtectedRoute allowedRoles={["admin"]}>
                                <Settings />
                            </ProtectedRoute>
                        }
                    />
                    {/* <Route path="/message" element={<Message />} /> */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </div>
    );
}

export default AdminCollection;
