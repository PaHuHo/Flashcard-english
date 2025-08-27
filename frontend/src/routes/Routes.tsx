import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import TopicPage from "../pages/TopicPage";
import NoFoundPage from "../pages/NoFoundPage";

function AppRoutes() {
  return (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/topic/:id" element={<TopicPage />} />
        <Route path="*" element={<NoFoundPage />} />
      </Routes>
  );
}

export default AppRoutes;
