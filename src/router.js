import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AccessGuard from "./components/AccessGuard";
import DepartmentsPage from "./pages/DepartmentsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <AccessGuard type="auth"><LoginPage /></AccessGuard>
      },
      {
        path: "dashboard",
        element: <AccessGuard type="auth"><DashboardPage /></AccessGuard>
      },
      {
        path: "departments",
        element: <AccessGuard type="admin"><DepartmentsPage /></AccessGuard>
      }
    ]
  },
]);

export default router;