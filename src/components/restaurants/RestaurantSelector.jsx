import { useEffect, useState } from "react";
import { Store } from "lucide-react";
import { authRequest } from "../../services/api/api";
import { selectedRestaurant } from "../../services/api/scopedFetch";
import { useMyContext } from "../../context/AppContext";
export default function RestaurantSelector() {
  const { user } = useMyContext();
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    const refresh = () => authRequest("/api/v1/restaurants").then(rows => { if (active) setRestaurants(rows); }).catch(e => { if (active) setError(e.message); });
    refresh(); window.addEventListener("restaurants-updated", refresh);
    return () => { active = false; window.removeEventListener("restaurants-updated", refresh); };
  }, []);
  return <div className="ws-restaurant"><Store size={17} /><span>{user === "super_admin" ? "Restaurant context" : "Your restaurant"}</span>{user === "super_admin" ? <select aria-label="Selected restaurant" value={selectedRestaurant()} onChange={e => { localStorage.setItem("restaurant_id", e.target.value); window.location.reload(); }}><option value="" disabled>Select restaurant</option>{restaurants.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}</select> : <strong>{restaurants[0]?.name || "Loading…"}</strong>}{error && <span role="alert">{error}</span>}</div>;
}
