import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMyContext } from "../../context/AppContext";
import { apiFetch } from "../../services/api/scopedFetch";
import { API_BASE_URL } from "../../config/api";
const cache = new Map();
export default function Home() {
  const selectedRestaurantId = useMyContext((state) => state.selectedRestaurantId);
  const restaurantId = String(selectedRestaurantId || 1);
  const [data, setData] = useState(() => cache.get(restaurantId));
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setData(cache.get(restaurantId)); setError("");
    apiFetch(`${API_BASE_URL}/api/v1/home`, { signal: controller.signal })
      .then(async response => { const body = await response.json(); if (!response.ok) throw new Error(body.message || "Unable to load Home"); return body; })
      .then(body => { if (!controller.signal.aborted) { cache.set(restaurantId, body); setData(body); } })
      .catch(e => { if (!controller.signal.aborted) setError(e.message); });
    return () => controller.abort();
  }, [restaurantId, retry]);
  return <div className="home-page">
    {error && <div role="alert" className="p-6 text-center">{error} <button onClick={() => setRetry(value => value + 1)} className="underline">Retry</button></div>}
    {!data && !error && <div role="status" className="h-[400px] flex items-center justify-center">Loading restaurant…</div>}
    {data && <>
      <section className="home-hero">
        {data.restaurant.hero_image_url && <img src={data.restaurant.hero_image_url} alt="" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover" />}
        <div className="home-hero-shade" />
        <div className="home-hero-copy"><span className="home-kicker">WELCOME TO YOUR TABLE</span><h1>{data.restaurant.hero_title || data.restaurant.name}</h1>{data.restaurant.description && <p className="mt-4 max-w-2xl">{data.restaurant.description}</p>}<div className="home-actions"><Link to="/menu" className="site-action">Explore the menu ↗</Link><Link to="/booking" className="home-secondary">Reserve a table</Link></div></div>
      </section>
      <section className="max-w-6xl mx-auto p-6"><h2 className="text-2xl font-bold mb-4 text-center">Our dishes</h2>
        {data.dishes.length ? <div className="home-dishes">{data.dishes.map(dish => <Link to="/menu" key={dish.id} className="home-dish">
          {dish.image_urls ? <img src={dish.image_urls} alt={dish.name} loading="lazy" width={96} height={96} className="home-dish-image" /> : <div className="home-dish-placeholder">{dish.name.slice(0, 1)}</div>}
          <span className="mt-2 font-semibold">{dish.name}</span>
        </Link>)}</div> : <p className="text-center text-slate-600">No dishes published yet.</p>}
      </section>
      {data.restaurant.sections.filter(section => section && typeof section.title === "string" && typeof section.description === "string").map((section, index) => <section key={index} className="max-w-6xl mx-auto p-6"><h2 className="text-2xl font-bold mb-3">{section.title}</h2><p className="whitespace-pre-line">{section.description}</p></section>)}
      {data.restaurant.opening_hours && <section className="max-w-6xl mx-auto p-6"><h2 className="text-2xl font-bold mb-3">Opening hours</h2><p className="whitespace-pre-line">{data.restaurant.opening_hours}</p></section>}
    </>}
  </div>;
}

