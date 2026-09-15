import { useEffect, useState, useCallback } from "react";
import { Search, Plus, Users, Store, CheckCircle2 } from "lucide-react";
import { authRequest } from "../../services/api/api";
import { useMyContext } from "../../context/AppContext";
import { roleLabels } from "../../config/roleLabels";
export default function Staff() {
  const { user } = useMyContext();
  const system = user === "super_admin";
  const [restaurants, setRestaurants] = useState([]);
  const [staff, setStaff] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ username: "", mob_no: "", email: "", password: "", role: "kitchen", restaurant_id: "" });
  const refresh = useCallback(async () => {
    const [r, s] = await Promise.all([authRequest("/api/v1/restaurants"), authRequest("/api/v1/staff")]);
    setRestaurants(r); setStaff(s);
    setForm(old => ({ ...old, restaurant_id: old.restaurant_id || String(r[0]?.id || "") }));
  }, []);
  useEffect(() => { refresh().catch(e => setError(e.message)).finally(() => setLoading(false)); }, [refresh]);
  async function submit(event, restaurant = false) {
    event.preventDefault(); setBusy(true); setError(""); setSuccess("");
    try {
      await authRequest("/api/v1/" + (restaurant ? "restaurants" : "staff"), { method: "POST", body: JSON.stringify(restaurant ? { name } : form) });
      if (restaurant) setName(""); else setForm(old => ({ ...old, username: "", mob_no: "", password: "", email: "" }));
      setSuccess(restaurant ? "Restaurant created. You can now assign its team." : "Account created. Your team member can now sign in.");
      await refresh(); window.dispatchEvent(new Event("restaurants-updated"));
    } catch (e) { setError(e.message); } finally { setBusy(false); }
  }
  const filtered = staff.filter(s => [s.username, s.mob_no, restaurants.find(r => r.id === s.restaurant_id)?.name].join(" ").toLowerCase().includes(search.toLowerCase()));
  return <div className="ws-stack">
    <div className="ws-page-heading"><div><p className="ws-eyebrow">{system ? "YOUR ORGANIZATION" : "THE PEOPLE BEHIND SERVICE"}</p><h1>{system ? "Restaurants & people" : "Your kitchen team"}</h1><p>{system ? "Create locations, assign managers, and give every kitchen its own team." : "Create dedicated kitchen accounts for your restaurant."}</p></div><span className="ws-role"><Users size={16} />{staff.length} staff accounts</span></div>
    {error && <div className="ws-alert" role="alert">{error}</div>}{success && <div className="ws-success" role="status"><CheckCircle2 size={18} />{success}</div>}
    <div className="ws-team-layout"><div className="ws-stack">
      {system && <section className="ws-panel ws-form-panel"><div className="ws-panel-heading"><div><h2><Store size={19} />Add a restaurant</h2><p>A new home for your next great service.</p></div></div><form onSubmit={e => submit(e, true)}><label>Restaurant name<input required maxLength={150} placeholder="e.g. Riverside Kitchen" value={name} onChange={e => setName(e.target.value)} /></label><button disabled={busy} className="ws-button primary"><Plus size={16} />{busy ? "Please wait…" : "Create restaurant"}</button></form></section>}
      <section className="ws-panel ws-form-panel"><div className="ws-panel-heading"><div><h2><Users size={19} />Add a team member</h2><p>{system ? "Choose their role and restaurant." : "Kitchen accounts can manage your order queue."}</p></div></div><form onSubmit={submit}>
        <div className="ws-form-grid">{[["username", "Full name", "Alex Morgan"], ["mob_no", "Mobile number", "Mobile used to sign in"], ["email", "Email (optional)", "alex@example.com"], ["password", "Temporary password", "At least 8 characters"]].map(([key, label, placeholder]) => <label key={key}>{label}<input type={key === "password" ? "password" : key === "email" ? "email" : key === "mob_no" ? "tel" : "text"} required={key !== "email"} minLength={key === "password" ? 8 : undefined} maxLength={key === "username" ? 50 : key === "mob_no" ? 20 : key === "email" ? 100 : undefined} autoComplete={key === "password" ? "new-password" : "off"} placeholder={placeholder} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} /></label>)}</div>
        <div className="ws-form-grid"><label>Role<select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}><option value="kitchen">Kitchen staff</option>{system && <option value="restaurant_admin">Restaurant admin</option>}</select></label><label>Restaurant<select required value={form.restaurant_id} onChange={e => setForm({ ...form, restaurant_id: e.target.value })}><option value="">Select a restaurant</option>{restaurants.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}</select></label></div>
        <button disabled={busy || loading || !restaurants.length} className="ws-button primary"><Plus size={16} />{busy ? "Please wait…" : "Create account"}</button>
      </form></section></div>
      <section className="ws-panel"><div className="ws-panel-heading"><div><h2>Team directory</h2><p>{system ? "People across your restaurants" : "Your restaurant's kitchen accounts"}</p></div></div><label className="ws-search"><Search size={17} /><input aria-label="Search team members" placeholder="Search name, mobile, restaurant…" value={search} onChange={e => setSearch(e.target.value)} /></label>
      {loading ? <div className="ws-empty" role="status">Loading your team…</div> : !filtered.length ? <div className="ws-empty"><Users size={30} /><h3>{search ? "No matching team members" : "Your team starts here"}</h3><p>{search ? "Try another name or mobile number." : "Create an account using the form to get started."}</p></div> : <div className="ws-directory">{filtered.map(s => <article key={s.id}><span className="ws-avatar">{s.username?.slice(0, 1).toUpperCase() || "T"}</span><div><strong>{s.username}</strong><p>{s.mob_no}</p><small>{restaurants.find(r => r.id === s.restaurant_id)?.name || "Restaurant " + s.restaurant_id}</small></div><div className="ws-member-meta"><span className="ws-badge">{roleLabels[s.role] || "Unassigned"}</span><small>{Number(s.isActive) === 1 ? "Active" : "Inactive"}</small></div></article>)}</div>}
      </section>
    </div>
  </div>;
}
