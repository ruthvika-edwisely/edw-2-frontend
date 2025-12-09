import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/DashboardPage/Dashboard.jsx";
import CodeEditorPage from "../pages/CodeEditorPage/CodeEditorPage.jsx";
import LayoutPage from "../pages/LayoutPage/LayoutPage.jsx";
import AllProblemsPage from "../pages/AllProblemsPage/AllProblemsPage.jsx";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
<<<<<<< HEAD
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
=======
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
>>>>>>> 2aa2b4266616bb52af9f44a9561ee5c516b2e1ca
  return isAuthenticated ? children : <Navigate to="/login" />;
}

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <LayoutPage />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="/problem/:id" element={<CodeEditorPage />} />
        <Route path="/all-problems" element={<AllProblemsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
