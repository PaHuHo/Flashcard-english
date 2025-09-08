import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import TopicPage from "../pages/TopicPage";
import NoFoundPage from "../pages/NoFoundPage";
import Layout from "../pages/LayoutPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute>
            <Layout />
          </ProtectedRoute>}>
        <Route index element={<HomePage />} />
        <Route path="topic/detail/:id" element={<TopicPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NoFoundPage />} />
    </Routes>
    
  );
}

export default AppRoutes;
