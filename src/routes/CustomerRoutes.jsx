import { Routes, Route } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/Footer";

import Home from "../Pages/customer/Home";
import Menu from "../Pages/customer/Menu";
import Booking from "../Pages/customer/Booking";
import Contact from "../Pages/customer/Contact";
import About from "../Pages/customer/About";
import Login from "../Pages/auth/Login";
import Register from "../Pages/auth/Register";
import VerifyOtp from "../Pages/auth/VerifyOtp";
import ForgetPassword from "../Pages/auth/ForgetPassword";
// import ChatApp from "../Chating/chatApp";


// Helper wrapper to use useLocation correctly
function CustomerRoutes() {

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
                    <Route path="/forget-password" element={<ForgetPassword />} />
                    <Route path="/verify-otp" element={<VerifyOtp />} />

                    {/* Catch-all route */}
                    <Route path="*" element={<Home />} />
                </Routes>
            </main>


            <Footer />
        </div>
    );
}


export default CustomerRoutes;