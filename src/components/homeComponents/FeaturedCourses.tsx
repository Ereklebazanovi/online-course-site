// src/components/homeComponents/FeaturedCourses.tsx
import { FC } from "react";
import { Link } from "react-router-dom";

const FeaturedCourses: FC = () => {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
          Featured Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, idx) => (
            <article
              key={idx}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img
                  src={`https://via.placeholder.com/400x200?text=Course+${idx + 1}`}
                  alt={`Course ${idx + 1}`}
                  className="w-full h-full object-cover transform hover:scale-105 transition"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2">
                  Course Title {idx + 1}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Instructor: John Doe
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-500">★★★★☆</span>
                  <Link
                    to={`/courses/${idx + 1}`}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    View Course →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
