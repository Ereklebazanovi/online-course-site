// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
        {/* Public pages inside MainLayout */}
        <Route element={<MainLayout />}>
          {/* Home */}
          <Route
            index
            element={
              <>
                <HeroSection />
                <FeaturedCourses />
              </>
            }
          />

          {/* All courses & filtering */}
          <Route path="courses" element={<FeaturedCourses />} />
          <Route
            path="courses/category/:category"
            element={<FeaturedCourses />}
          />

          {/* Course detail (public) */}
          <Route path="/courses/:courseId" element={<CourseDetail />} />


          {/* Protected pages */}
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="courses/:slug/content"
            element={
              <PrivateRoute>
                <CourseContent />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Auth pages outside the main layout */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Fallback – redirect everything else to home */}
        <Route path="*" element={<MainLayout />}>
          <Route index element={<FeaturedCourses />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
