import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchCourses } from "../courses/slices/coursesSlice";
import Skeleton from "antd/es/skeleton";
import CourseCard from "../courses/components/CourseCard";

const FeaturedCourses = () => {
  const dispatch = useAppDispatch();
  const { courses, loading, error } = useAppSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
           შემოთავაზებული კურსები
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton
                key={i}
                active
                paragraph={{ rows: 3 }}
                className="rounded-xl"
              />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-600">⚠️ {error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedCourses;
