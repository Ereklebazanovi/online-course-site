// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HeroSection from "./components/homeComponents/HeroSection";
import FeaturedCourses from "./components/homeComponents/FeaturedCourses";
import WhyChooseUs from "./components/homeComponents/WhyChooseUs";
import Testimonials from "./components/homeComponents/Testimonials";
import Footer from "./components/homeComponents/Footer";

import Login from "./features/auth/Login";
import Register from "./features/auth/Register";

import Dashboard from "./pages/Dashboard";
import CourseDetail from "./pages/CourseDetail";
import CourseContent from "./pages/CourseContent"; // ← import here
import Profile from "./pages/Profile";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <HeroSection />

      <Routes>
        {/* Public listing & marketing */}
        <Route path="/" element={<FeaturedCourses />} />
        <Route path="/courses" element={<FeaturedCourses />} />

        {/* Course detail + purchase (requires auth) */}
        <Route
          path="/courses/:slug"
          element={
            <PrivateRoute>
              <CourseDetail />
            </PrivateRoute>
          }
        />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />

          {/* After purchase → protected content page */}
          <Route path="/courses/:slug/content" element={<CourseContent />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<FeaturedCourses />} />
      </Routes>

      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </Router>
  );
}

export default App;
