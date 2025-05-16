import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Course } from "../courses/types/Course";
import { Alert, Tag, Button } from "antd";
import Skeleton from "antd/es/skeleton";

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [firstLessonId, setFirstLessonId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCourse = async () => {
      try {
        if (!courseId) return;
        const courseRef = doc(db, "courses", courseId);
        const courseSnap = await getDoc(courseRef);
        if (courseSnap.exists()) {
          setCourse({ id: courseSnap.id, ...courseSnap.data() } as Course);
        }

        // Fetch first lesson ID
        const lessonsRef = collection(db, "courses", courseId, "lessons");
        const lessonsQuery = query(lessonsRef, orderBy("position"), limit(1));
        const lessonsSnap = await getDocs(lessonsQuery);
        const firstDoc = lessonsSnap.docs[0];
        if (firstDoc) {
          setFirstLessonId(firstDoc.id);
        }
      } catch (error) {
        console.error("Failed to load course:", error);
        setError("Failed to load course. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId]);

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-2xl">
        {loading ? (
          <Skeleton active paragraph={{ rows: 6 }} className="rounded-xl" />
        ) : !course ? (
          <Alert
            message="Course not found"
            type="error"
            showIcon
            className="text-center"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left - Course Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {course.title}
              </h1>
              <p className="text-gray-700 mb-4">{course.description}</p>

              <div className="flex flex-wrap gap-3 mb-4">
                <Tag color="blue">Instructor: {course.teacherName}</Tag>
                <Tag color="purple">
                  Category: {course.category || "General"}
                </Tag>
                <Tag color="gold">Level: {course?.level || "All Levels"}</Tag>
              </div>

              <div className="mb-6 space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    ✅ What you'll learn
                  </h2>
                  <ul className="list-disc list-inside text-gray-600 text-sm">
                    <li>Understand the basics of this subject</li>
                    <li>Develop real-world skills and confidence</li>
                    <li>Apply knowledge in practical scenarios</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    💡 Why this course?
                  </h2>
                  <ul className="list-disc list-inside text-gray-600 text-sm">
                    <li>Designed by experts with experience</li>
                    <li>Video-based and mobile-friendly</li>
                    <li>Self-paced and progress-tracked</li>
                  </ul>
                </div>
              </div>

              <div className="text-xl font-semibold text-indigo-600 mb-4">
                ${course.price}
              </div>

              {error && (
                <Alert
                  message={error}
                  type="error"
                  showIcon
                  className="mb-4"
                  closable
                  onClose={() => setError("")}
                />
              )}

              <div className="flex flex-wrap gap-4">
                {firstLessonId && (
                  <Link to={`/courses/${courseId}/content/${firstLessonId}`}>
                    <Button type="primary" size="large">
                      Explore Course Content
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Right - Teaser Video or Thumbnail */}
            <div className="relative w-full rounded-xl overflow-hidden shadow-md aspect-video">
              {course.bunnyVideoId ? (
                <iframe
                  src={`https://iframe.mediadelivery.net/embed/425843/${course.bunnyVideoId}?autoplay=false&loop=false&muted=false&preload=true&responsive=true`}
                  title={course.title}
                  allowFullScreen
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  className="absolute top-0 left-0 w-full h-full border-0"
                />
              ) : (
                <img
                  src={course.thumbnailUrl}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
