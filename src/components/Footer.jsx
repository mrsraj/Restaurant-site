import { Link } from "react-router-dom";
import { UtensilsCrossed, ArrowUpRight } from "lucide-react";
export default function Footer() {
 return <footer className="site-footer"><div className="site-footer-grid"><div><div className="site-footer-brand"><UtensilsCrossed size={26}/> MyRestaurant</div><p>A place to find your next meal.<br/>Explore the menu, reserve a table, and enjoy.</p></div><div><h2>Explore</h2><Link to="/home">Home</Link><Link to="/menu">Our menu</Link><Link to="/about">About us</Link></div><div><h2>Plan your visit</h2><Link to="/booking">Reserve a table <ArrowUpRight size={14}/></Link><Link to="/contact">Get in touch</Link><Link to="/login">Your account</Link></div></div><div className="site-footer-bottom"><span>© {new Date().getFullYear()} MyRestaurant</span><span>Made for meals worth sharing.</span></div></footer>;
}
