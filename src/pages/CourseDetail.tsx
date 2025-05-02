import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import { Course } from "../types/Course";
import { Skeleton, Button, Alert, Tag } from "antd";

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [error, setError] = useState("");

  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const loadCourse = async () => {
      try {
        if (!courseId) return;

        const courseRef = doc(db, "courses", courseId);
        const courseSnap = await getDoc(courseRef);
        if (courseSnap.exists()) {
          setCourse({ id: courseSnap.id, ...courseSnap.data() } as Course);
        }

        if (currentUser) {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);
          const userData = userSnap.data();
          if (userData?.enrolledCourses?.includes(courseId)) {
            setEnrolled(true);
          }
        }
      } catch (error) {
        console.error("Failed to load course:", error);
        setError("Failed to load course. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId, currentUser]);

  const handleEnroll = async () => {
    if (!currentUser || !courseId) {
      setError("You must be logged in to enroll.");
      return;
    }

    try {
      setEnrolling(true);
      const userRef = doc(db, "users", currentUser.uid);

      await updateDoc(userRef, {
        enrolledCourses: arrayUnion(courseId),
        [`progress.${courseId}`]: 0,
      });

      setEnrolled(true);
    } catch (err) {
      console.error("Enrollment failed", err);
      setError("Something went wrong during enrollment.");
    } finally {
      setEnrolling(false);
    }
  };

  return (
    <div className="p-8">
    <div className="max-w-7xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-2xl">
      {loading ? (
        <Skeleton active paragraph={{ rows: 6 }} className="rounded-xl" />
      ) : !course ? (
        <Alert message="Course not found" type="error" showIcon className="text-center" />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left - Course Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{course.title}</h1>
            <p className="text-gray-700 mb-4">{course.description}</p>

            <div className="flex flex-wrap gap-3 mb-4">
              <Tag color="blue">Instructor: {course.teacherName}</Tag>
              <Tag color="purple">Category: {course.category || "General"}</Tag>
              <Tag color="gold">Level: {course.level || "All Levels"}</Tag>
            </div>

            <div className="mb-6 space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-1">✅ What you'll learn</h2>
                <ul className="list-disc list-inside text-gray-600 text-sm">
                  <li>Understand the basics of this subject</li>
                  <li>Develop real-world skills and confidence</li>
                  <li>Apply knowledge in practical scenarios</li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-1">💡 Why this course?</h2>
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
              {currentUser ? (
                enrolled ? (
                  <>
                    <div className="text-green-600 font-medium">✅ You're already enrolled!</div>
                    <Link to={`/courses/${courseId}/content`}>
                      <Button type="primary" size="large">Go to Course</Button>
                    </Link>
                  </>
                ) : (
                  <Button
                    type="primary"
                    size="large"
                    loading={enrolling}
                    onClick={handleEnroll}
                  >
                    {enrolling ? "Enrolling..." : "Enroll Now"}
                  </Button>
                )
              ) : (
                <Link to="/login">
                  <Button type="primary" size="large">Login to Enroll</Button>
                </Link>
              )}
            </div>
          </div>

          {/* Right - Course Video */}
          <div className="relative w-full rounded-xl overflow-hidden shadow-md aspect-video">
            {course.videoUrl && course.videoUrl.includes("youtube.com") ? (
              <iframe
                src={course.videoUrl.replace("watch?v=", "embed/")}
                title={course.title}
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
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
