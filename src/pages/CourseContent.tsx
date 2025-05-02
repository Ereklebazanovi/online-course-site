import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const CourseContent = () => {
  const { slug } = useParams(); // slug = courseId
  const [isEnrolled, setIsEnrolled] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState<any>(null); // optional if you want course info

  useEffect(() => {
    const checkEnrollment = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user || !slug) {
        setIsEnrolled(false);
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();

        if (userData?.enrolledCourses?.includes(slug)) {
          setIsEnrolled(true);

          // Optional: Load course details
          const courseRef = doc(db, "courses", slug);
          const courseSnap = await getDoc(courseRef);
          if (courseSnap.exists()) {
            setCourseData(courseSnap.data());
          }
        } else {
          setIsEnrolled(false);
        }
      } catch (err) {
        console.error("Enrollment check failed", err);
        setIsEnrolled(false);
      } finally {
        setLoading(false);
      }
    };

    checkEnrollment();
  }, [slug]);

  if (loading) return <div className="p-6 text-center">Checking access...</div>;

  if (!isEnrolled) {
    return (
      <div className="max-w-xl mx-auto p-6 mt-10 text-center border rounded shadow">
        <h2 className="text-xl font-bold mb-2 text-red-600">Access Denied</h2>
        <p className="text-gray-600">You must enroll in this course to view the content.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">{courseData?.title}</h1>
      <p className="text-gray-700 mb-4">{courseData?.description}</p>

      {/* Render video or modules here */}
      <div className="bg-gray-100 p-4 rounded">
        <p className="text-gray-600">[📚 Course lessons and videos will appear here...]</p>
      </div>
    </div>
  );
};

export default CourseContent;
