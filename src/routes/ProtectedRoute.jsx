import { Navigate } from "react-router-dom";
<<<<<<< HEAD
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
=======
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
>>>>>>> 2aa2b4266616bb52af9f44a9561ee5c516b2e1ca

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
};

<<<<<<< HEAD

=======
>>>>>>> 2aa2b4266616bb52af9f44a9561ee5c516b2e1ca
export default ProtectedRoute;
