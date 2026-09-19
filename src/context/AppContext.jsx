import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import { authRequest } from "../services/api/api";
import useAppStore from "../store/useAppStore";

export default function AppProvider({ children }) {
  const setUser = useAppStore((state) => state.setUser);
  const setAuth = useAppStore((state) => state.setAuth);
  const setAuthLoading = useAppStore((state) => state.setAuthLoading);
  const setSelectedRestaurantId = useAppStore(
    (state) => state.setSelectedRestaurantId,
  );

  useEffect(() => {
    let active = true;

    if (!localStorage.getItem("user_info")) {
      setAuthLoading(false);
      return undefined;
    }

    authRequest("/api/v1/users/me")
      .then((data) => {
        if (!active) return;

        const session = JSON.parse(
          localStorage.getItem("user_info") || "null",
        );

        localStorage.setItem(
          "user_info",
          JSON.stringify({
            ...session,
            ...data,
          }),
        );

        localStorage.setItem("user", data.role);

        setUser(data.role);
        setAuth(data.role);

        if (data.restaurant_id) {
          setSelectedRestaurantId(data.restaurant_id);
        }
      })
      .catch(() => {
        if (!active) return;

        localStorage.removeItem("user");
        localStorage.removeItem("user_info");

        setUser(null);
        setAuth(null);
      })
      .finally(() => {
        if (active) {
          setAuthLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [setAuth, setAuthLoading, setSelectedRestaurantId, setUser]);

  return children;
}

export function useMyContext(selector = (state) => state) {
  return useAppStore(useShallow(selector));
}
