import { useSelector } from "react-redux";
import LoginPage from "../pages/LoginPage";

export default function AuthGuard({ children }) {
  const { isAuthenticated } = useSelector(state => state.auth);

  return isAuthenticated ? children : <LoginPage />;
}