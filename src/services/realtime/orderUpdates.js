import { io } from "socket.io-client";
import { API_BASE_URL } from "../../config/api";
import { selectedRestaurant } from "../api/scopedFetch";
// Each mounted screen owns and cleans up its connection.
export function subscribeToOrders(refresh) {
  let session;
  try { session = JSON.parse(localStorage.getItem("user_info") || "null"); } catch { return () => {}; }
  if (!session?.token) return () => {};
  const socket = io(API_BASE_URL, { auth: { token: session.token, restaurantId: selectedRestaurant() } });
  const update = () => { Promise.resolve().then(refresh).catch(() => {}); };
  socket.on("orders:changed", update);
  // Reload after reconnect to recover changes missed while disconnected.
  socket.on("connect", update);
  return () => { socket.off("orders:changed", update); socket.off("connect", update); socket.disconnect(); };
}
