import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AuthGuard from "./components/AuthGuard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <AuthGuard><LoginPage /></AuthGuard>
      },
      {
        path: "dashboard",
        element: <AuthGuard><DashboardPage /></AuthGuard>
      }
    ]
  },
]);

export default router;