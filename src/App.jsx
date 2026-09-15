import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppProvider from "./context/AppContext";
import AppRoutes from "./routes/AppRoutes";
export default function App() {
  return <AppProvider><BrowserRouter><AppRoutes /></BrowserRouter><Toaster position="top-right" /></AppProvider>;
}
