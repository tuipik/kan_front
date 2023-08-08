import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./components/DashboardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "page1/",
        element: <div>page1</div>
      },
      {
        path: "page2/",
        element: <div>page2</div>
      },
      {
        path: "dashboard",
        element: <DashboardPage />
      }
    ]
  },
  {
    path: "dich",
    element: <div>dich</div>
  }
]);

export default router;