import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import HeroSection from "./components/homeComponents/HeroSection";
import FeaturedCourses from "./components/homeComponents/FeaturedCourses";

import Login from "./features/auth/Login";
import Register from "./features/auth/Register";

import Dashboard from "./pages/Dashboard";
import CourseDetail from "./pages/CourseDetail";
import CourseContent from "./pages/CourseContent";
import Profile from "./pages/Profile";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth pages outside layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Public + Protected pages inside MainLayout */}
        <Route element={<MainLayout />}>
          {/* Public routes */}
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
          <Route
            path="/courses/category/:category"
            element={<FeaturedCourses />}
          />
          <Route path="/courses/:courseId" element={<CourseDetail />} />

          {/* Protected routes */}
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
          <Route
            path="/courses/:slug/content"
            element={
              <PrivateRoute>
                <CourseContent />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Catch-all fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
