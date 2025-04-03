import { Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function PrivateRoute({ children }) {
  const { loggedInUser } = useApp();
  return loggedInUser ? children : <Navigate to="/login" />;
}
