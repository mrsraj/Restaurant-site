import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./components/Footer";

import Home from "./Pages/Home";
import Menu from "./Pages/Menu";
import Booking from "./Pages/Booking";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Admin from "./Pages/Admin";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";

import AppProvider from "./context/AppContext";

export default function App() {
  return (
    <AppProvider>
      <div className="flex flex-col min-h-screen">
        <BrowserRouter>
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    </AppProvider>
  );
}
