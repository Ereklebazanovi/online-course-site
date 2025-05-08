import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Suspense, lazy } from "react";

// Static components (don't lazy-load tiny ones)
import MainLayout from "./layouts/MainLayout";
import HeroSection from "./features/auth/home/hero/HeroSection";
import FeaturedCourses from "./features/auth/home/featured/FeaturedCourses";
import PrivateRoute from "./components/common/PrivateRoute";
import AdminRoute from "./components/common/AdminRoute";
import LoginModal from "./features/auth/LoginModal";
import RegisterModal from "./features/auth/RegisterModal";
import { useLoginModal } from "./contexts/LoginModalContext";
import { useRegisterModal } from "./contexts/RegisterModalContext";

// 🔁 Lazy-loaded route components
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CourseDetail = lazy(() => import("./pages/CourseDetail"));
const CourseContent = lazy(() => import("./pages/CourseContent"));
const Profile = lazy(() => import("./pages/Profile"));

// 🔐 Admin (lazy)
const AdminLayout = lazy(() => import("./admin/layout/AdminLayout"));
const AdminDashboard = lazy(() => import("./admin/pages/AdminDashboard"));
const ManageCourses = lazy(() => import("./admin/pages/ManageCourses"));
const ManageUsers = lazy(() => import("./admin/pages/ManageUsers"));
const ManagePayments = lazy(() => import("./admin/pages/ManagePayments"));
const ManageLessons = lazy(() => import("./admin/pages/ManageLessons"));

function AppContent() {
  const location = useLocation();
  const { show: loginShow, close: loginClose } = useLoginModal();
  const { show: registerShow, close: registerClose } = useRegisterModal();

  return (
    <>
      {/* Modals */}
      <LoginModal open={loginShow} onClose={loginClose} redirectTo={location.pathname} />
      <RegisterModal open={registerShow} onClose={registerClose} />

      {/* Routes wrapped in Suspense */}
      <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<><HeroSection /><FeaturedCourses /></>} />
            <Route path="/courses" element={<FeaturedCourses />} />
            <Route path="/courses/category/:category" element={<FeaturedCourses />} />
            <Route path="/courses/:courseId" element={<CourseDetail />} />
            <Route path="/courses/:courseId/content" element={<CourseContent />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          </Route>

          {/* Admin-only routes */}
          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/courses" element={<ManageCourses />} />
              <Route path="/admin/users" element={<ManageUsers />} />
              <Route path="/admin/payments" element={<ManagePayments />} />
              <Route path="/admin/courses/:courseId/lessons" element={<ManageLessons />} />

            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
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
