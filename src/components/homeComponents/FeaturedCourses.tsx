// src/components/homeComponents/FeaturedCourses.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

interface Course {
  slug: string;
  title: string;
  thumbnail: string;
  category: string;
}

const FeaturedCourses: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const snap = await getDocs(collection(db, "courses"));
        const all = snap.docs.map(d => ({ slug: d.id, ...(d.data() as Omit<Course, "slug">) }));
        setCourses(
          category
            ? all.filter(course => course.category === category)
            : all
        );
      } catch (err) {
        console.error(err);
        setError("Failed to load courses. Please try again.");
      } finally {
        setLoading(false);
      }
    })();
  }, [category]);

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {loading ? (
        // Skeleton grid: 6 placeholder cards
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="space-y-4 animate-pulse border rounded p-4"
            >
              <div className="bg-gray-200 h-40 rounded" />
              <div className="h-6 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="p-6 text-center text-gray-600">
          No courses found{category ? ` in “${category}”` : ""}.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(c => (
            <Link
              key={c.slug}
              to={`/courses/${c.slug}`}
              className="block border rounded overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={c.thumbnail}
                alt={c.title}
                className="w-full h-40 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{c.title}</h3>
                <p className="text-sm text-gray-500 capitalize">
                  {c.category}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedCourses;
