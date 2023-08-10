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
        path: "page1/",
        element: <AuthGuard><div>page1</div></AuthGuard>
      },
      {
        path: "page2/",
        element: <div>page2</div>
      },
      {
        path: "dashboard",
        element: <AuthGuard><DashboardPage /></AuthGuard>
      }
    ]
  },
  {
    path: "dich",
    element: <div>dich</div>
  }
]);

export default router;