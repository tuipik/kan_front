import { useSelector } from "react-redux";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";

export default function AccessGuard({ children, type }) {
  const { isAuthenticated, data: {is_admin} } = useSelector(state => state.auth);

  switch (type) {
    case 'auth':
      return isAuthenticated ? children : <LoginPage />;
    case 'admin':
      return is_admin ? children : <DashboardPage />;
  }
}