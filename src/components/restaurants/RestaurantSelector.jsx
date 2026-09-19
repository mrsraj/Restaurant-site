import { useEffect, useState } from "react";
import { Store } from "lucide-react";

import { useMyContext } from "../../context/AppContext";
import { authRequest } from "../../services/api/api";

export default function RestaurantSelector() {
  const { user, selectedRestaurantId, setSelectedRestaurantId } = useMyContext((state) => ({
    user: state.user,
    selectedRestaurantId: state.selectedRestaurantId,
    setSelectedRestaurantId: state.setSelectedRestaurantId,
  }));
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const refresh = () =>
      authRequest("/api/v1/restaurants")
        .then((rows) => {
          if (!active) return;

          setRestaurants(rows);

          if (user === "super_admin" && rows.length && !selectedRestaurantId) {
            setSelectedRestaurantId(rows[0].id);
          }
        })
        .catch((e) => {
          if (active) setError(e.message);
        });

    refresh();
    window.addEventListener("restaurants-updated", refresh);

    return () => {
      active = false;
      window.removeEventListener("restaurants-updated", refresh);
    };
  }, [selectedRestaurantId, setSelectedRestaurantId, user]);

  const selectedName =
    restaurants.find((restaurant) => String(restaurant.id) === String(selectedRestaurantId))
      ?.name || restaurants[0]?.name;

  return (
    <div className="ws-restaurant">
      <Store size={17} />
      <span>
        {user === "super_admin" ? "Restaurant context" : "Your restaurant"}
      </span>

      {user === "super_admin" ? (
        <select
          aria-label="Selected restaurant"
          value={selectedRestaurantId}
          onChange={(event) => setSelectedRestaurantId(event.target.value)}
        >
          <option value="" disabled>
            Select restaurant
          </option>
          {restaurants.map((restaurant) => (
            <option key={restaurant.id} value={restaurant.id}>
              {restaurant.name}
            </option>
          ))}
        </select>
      ) : (
        <strong>{selectedName || "Loading..."}</strong>
      )}

      {error && <span role="alert">{error}</span>}
    </div>
  );
}
