import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import HeroSection from "./components/homeComponents/HeroSection";
import FeaturedCourses from "./components/homeComponents/FeaturedCourses";

import Dashboard from "./pages/Dashboard";
import CourseDetail from "./pages/CourseDetail";
import CourseContent from "./pages/CourseContent";
import Profile from "./pages/Profile";

import PrivateRoute from "./components/PrivateRoute";

import LoginModal from "./features/auth/LoginModal";
import RegisterModal from "./features/auth/RegisterModal";

import { useLoginModal } from "./contexts/LoginModalContext";
import { useRegisterModal } from "./contexts/RegisterModalContext";

function AppContent() {
  const location = useLocation();
  const { show: loginShow, close: loginClose } = useLoginModal();
  const { show: registerShow, close: registerClose } = useRegisterModal();

  return (
    <>
      {/* Global modals rendered once, with redirect path */}
      <LoginModal open={loginShow} onClose={loginClose} redirectTo={location.pathname} />
      <RegisterModal open={registerShow} onClose={registerClose} />

      <Routes>
        <Route element={<MainLayout />}>
          {/* Public pages */}
          <Route
            index
            element={
              <>
                <HeroSection />
                <FeaturedCourses />
              </>
            }
          />
          <Route path="/courses" element={<FeaturedCourses />} />
          <Route path="/courses/category/:category" element={<FeaturedCourses />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
          <Route path="/courses/:courseId/content" element={<CourseContent />} />

          {/* Protected pages */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
