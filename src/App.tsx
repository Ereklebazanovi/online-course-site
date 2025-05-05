import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import HeroSection from "./features/auth/home/hero/HeroSection";
import FeaturedCourses from "./features/auth/home/featured/FeaturedCourses";
import Dashboard from "./pages/Dashboard";
import CourseDetail from "./pages/CourseDetail";
import CourseContent from "./pages/CourseContent";
import Profile from "./pages/Profile";

import PrivateRoute from "./components/common/PrivateRoute";
import AdminRoute from "./components/common/AdminRoute";

import LoginModal from "./features/auth/LoginModal";
import RegisterModal from "./features/auth/RegisterModal";
import { useLoginModal } from "./contexts/LoginModalContext";
import { useRegisterModal } from "./contexts/RegisterModalContext";

// 🔐 Admin imports
import AdminLayout from "./admin/layout/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import ManageCourses from "./admin/pages/ManageCourses";
import ManageUsers from "./admin/pages/ManageUsers";
import ManagePayments from "./admin/pages/ManagePayments";

function AppContent() {
  const location = useLocation();
  const { show: loginShow, close: loginClose } = useLoginModal();
  const { show: registerShow, close: registerClose } = useRegisterModal();

  return (
    <>
      <LoginModal open={loginShow} onClose={loginClose} redirectTo={location.pathname} />
      <RegisterModal open={registerShow} onClose={registerClose} />

      <Routes>
        {/* Public & Private User Routes */}
        <Route element={<MainLayout />}>
          <Route index element={<><HeroSection /><FeaturedCourses /></>} />
          <Route path="/courses" element={<FeaturedCourses />} />
          <Route path="/courses/category/:category" element={<FeaturedCourses />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
          <Route path="/courses/:courseId/content" element={<CourseContent />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/courses" element={<ManageCourses />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/payments" element={<ManagePayments />} />
          </Route>
        </Route>

        {/* Fallback */}
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
