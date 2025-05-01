// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HeroSection from "./components/homeComponents/HeroSection";
import FeaturedCourses from "./components/homeComponents/FeaturedCourses";
// import WhyChooseUs from "./components/homeComponents/WhyChooseUs";
// import Testimonials from "./components/homeComponents/Testimonials";
import Footer from "./components/homeComponents/Footer";

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
      <Navbar />
      <HeroSection />

      <Routes>
        {/* 1. HOME + ALL COURSES */}
        <Route path="/" element={<FeaturedCourses />} />
        <Route path="/courses" element={<FeaturedCourses />} />

        {/* 2. FILTER BY CATEGORY */}
        <Route
          path="/courses/category/:category"
          element={<FeaturedCourses />}
        />

        {/* 3. COURSE DETAIL (public) */}
        <Route path="/courses/:slug" element={<CourseDetail />} />

        {/* 4. AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 5. PROTECTED */}
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

        {/* 6. CATCH-ALL → redirect to courses */}
        <Route path="*" element={<FeaturedCourses />} />
      </Routes>

      {/* <WhyChooseUs /> */}
      {/* <Testimonials /> */}
      <Footer />
    </Router>
  );
}

export default App;
