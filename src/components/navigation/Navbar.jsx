import FixedHeader from "../common/FixedHeader";
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, UtensilsCrossed, ArrowUpRight } from "lucide-react";
import navLinks from "./Navbar-link";
import { useMyContext } from "../../context/AppContext";
import { useLogout } from "../../Pages/auth/LogOut";
export default function Navbar() {
 const [open, setOpen] = useState(false);
 const { user } = useMyContext(); const { logout } = useLogout();
 return <FixedHeader><header className="site-header"><div className="site-nav">
 <Link to="/home" className="site-brand" onClick={() => setOpen(false)}><span><UtensilsCrossed size={22} /></span>MyRestaurant<small>GOOD FOOD. GOOD COMPANY.</small></Link>
 <button className="site-menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="site-links" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
 <nav id="site-links" className={"site-links " + (open ? "is-open" : "")} aria-label="Main navigation">{navLinks.map(link => <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)}>{link.label}</NavLink>)}
 </nav><div className="site-account">{user ? <button className="site-action" onClick={() => {setOpen(false); logout();}}>Log out</button> : <Link className="site-action" to="/login" onClick={() => setOpen(false)}>Sign in <ArrowUpRight size={16}/></Link>}</div>
 </div></header></FixedHeader>;
}
