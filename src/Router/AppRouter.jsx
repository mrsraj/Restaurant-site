import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../components/Footer";

import Home from "../Pages/Home";
import Menu from "../Pages/Menu";
import Booking from "../Pages/Booking";
import Contact from "../Pages/Contact";
import About from "../Pages/About";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import NotFound from "../Common/DefaultComponent";
// import ChatApp from "../Chating/chatApp";


// Helper wrapper to use useLocation correctly
function AppContent() {

    return (
        <div className="flex flex-col min-h-screen">

            <Navbar />
            {/* <div className="fix bl-0">
                <ChatApp />
            </div> */}

            <main className="flex-grow bg-slate-300">
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Catch-all route */}
                    <Route path="*" element={<Home />} />
                </Routes>
            </main>


            <Footer />
        </div>
    );
}


export default AppContent;