import AppRoutes from "./app/routes/AppRoutes";
import { Footer, Navbar } from "./components/layout";
import { ScrollToTop, ToastProvider } from "./components/ui";
import { AppPreferencesProvider } from "./contexts/AppPreferencesContext";
import { useLocation } from "react-router-dom";


function App() {
  const { pathname } = useLocation();
  const isDashboardRoute = pathname.startsWith("/dashboard");

  return (
    <AppPreferencesProvider>
      <ToastProvider>
      {!isDashboardRoute && <Navbar />}

      <main>
        <AppRoutes />
      </main>

      {!isDashboardRoute && <Footer />}
      <ScrollToTop />
      </ToastProvider>
    </AppPreferencesProvider>
  );
}

export default App;
