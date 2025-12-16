import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/DashboardPage/Dashboard.jsx";
import CodeEditorPage from "../pages/CodeEditorPage/CodeEditorPage.jsx";
import LayoutPage from "../pages/LayoutPage/LayoutPage.jsx";
import AllProblemsPage from "../pages/AllProblemsPage/AllProblemsPage.jsx";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

const AppRouter = ({ mode, setMode }) => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <LayoutPage mode={mode} setMode={setMode} />
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
