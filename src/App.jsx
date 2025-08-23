import AppProvider from "./context/AppContext";
import { BrowserRouter } from "react-router-dom";
import AppContent from "./Router/AppRouter";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}
