import { create } from "zustand";

function getInitialRestaurantId() {
  try {
    const session = JSON.parse(localStorage.getItem("user_info") || "null");

    if (["restaurant_admin", "kitchen"].includes(session?.role)) {
      return String(session.restaurant_id || 1);
    }

    return String(localStorage.getItem("restaurant_id") || 1);
  } catch {
    return "1";
  }
}

const useAppStore = create((set) => ({
  reservations: [],
  messages: [],
  Auth: null,
  invoiceId: null,
  user: null,
  authLoading: true,
  selectedRestaurantId: getInitialRestaurantId(),

  addReservation: (value) =>
    set((state) => ({
      reservations: [...state.reservations, value],
    })),

  addMessage: (value) =>
    set((state) => ({
      messages: [...state.messages, value],
    })),

  setAuth: (Auth) => set({ Auth }),
  setInvoiceId: (invoiceId) => set({ invoiceId }),
  setUser: (user) => set({ user }),
  setAuthLoading: (authLoading) => set({ authLoading }),
  setSelectedRestaurantId: (selectedRestaurantId) => {
    const value = String(selectedRestaurantId || 1);

    localStorage.setItem("restaurant_id", value);
    set({ selectedRestaurantId: value });
  },
}));

export default useAppStore;
