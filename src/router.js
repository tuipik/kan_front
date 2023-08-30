import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AuthGuard from "./components/AuthGuard";
import DepartmentsPage from "./pages/DepartmentsPage";

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
      },
      {
        path: "departments",
        element: <AuthGuard><DepartmentsPage /></AuthGuard>
      }
    ]
  },
]);

export default router;