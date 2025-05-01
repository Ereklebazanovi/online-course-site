// src/components/homeComponents/HeroSection.tsx
import { FC } from "react";
import { Link } from "react-router-dom";

const HeroSection: FC = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
            Unlock Your Potential with Expert-Led Courses
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl opacity-90 mb-8">
            Start your learning journey today and transform your future with skills that matter.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/courses"
              className="inline-block bg-white text-blue-600 font-medium px-6 py-3 rounded-lg shadow hover:shadow-lg transition"
            >
              Explore Courses
            </Link>
            <Link
              to="/register"
              className="inline-block border-2 border-white text-white font-medium px-6 py-3 rounded-lg hover:bg-white hover:text-purple-600 transition"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
