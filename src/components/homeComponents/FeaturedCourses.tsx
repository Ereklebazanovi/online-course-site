import { useEffect, useState } from "react";
import { fetchCourses } from "../../services/courseService";
import { Course } from "../../types/Course";
import { Link } from "react-router-dom";

const FeaturedCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  if (loading)
    return <div className="text-center py-8">Loading courses...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {courses.map((course) => (
        <Link to={`/courses/${course.id}`} key={course.id}>
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300">
            {course.videoUrl && course.videoUrl.includes("youtube.com") ? (
              <iframe
                className="w-full h-48"
                src={course.videoUrl.replace("watch?v=", "embed/")}
                title={course.title}
                allowFullScreen
              />
            ) : (
              <img
                src={course.thumbnailUrl}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {course.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {course.description}
              </p>
              <div className="flex items-center justify-between"> 
  <div className="font-bold text-indigo-600 text-lg">
    ${course.price}
  </div>
  <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
    იხილეთ ვრცლად
  </button>
</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FeaturedCourses;
