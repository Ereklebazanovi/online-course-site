import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../firebase";
import { Course } from "../types/Course";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [progressMap, setProgressMap] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setError("მომხმარებელი არ არის ავტორიზებული.");
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();
        const enrolledIds: string[] = userData?.enrolledCourses || [];
        const progress: { [key: string]: number } = userData?.progress || {};
        const missingProgress: { [key: string]: number } = {};

        enrolledIds.forEach((id) => {
          if (!(id in progress)) {
            progress[id] = 0;
            missingProgress[`progress.${id}`] = 0;
          }
        });

        if (Object.keys(missingProgress).length > 0) {
          await updateDoc(userRef, missingProgress);
        }

        setProgressMap(progress);

        const courseDataPromises = enrolledIds.map(async (id) => {
          const courseRef = doc(db, "courses", id);
          const courseSnap = await getDoc(courseRef);
          return courseSnap.exists()
            ? ({ id: courseSnap.id, ...courseSnap.data() } as Course)
            : null;
        });

        const resolvedCourses = await Promise.all(courseDataPromises);
        setCourses(resolvedCourses.filter(Boolean) as Course[]);
      } catch (err) {
        console.error("კურსების ჩატვირთვა ვერ მოხერხდა:", err);
        setError("დაფიქსირდა შეცდომა კურსების ჩატვირთვისას.");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  const handleMarkComplete = async (courseId: string) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      [`progress.${courseId}`]: 100,
    });

    setProgressMap((prev) => ({ ...prev, [courseId]: 100 }));
  };

  const handleResetProgress = async (courseId: string) => {
    const confirmed = window.confirm("ნამდვილად გსურთ პროგრესის განულება?");
    if (!confirmed) return;

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      [`progress.${courseId}`]: 0,
    });

    setProgressMap((prev) => ({ ...prev, [courseId]: 0 }));
  };

  const handleUnenroll = async (courseId: string) => {
    const confirmed = window.confirm("ნამდვილად გსურთ კურსიდან გასვლა?");
    if (!confirmed) return;

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      enrolledCourses: arrayRemove(courseId),
    });

    setCourses((prev) => prev.filter((course) => course.id !== courseId));
    setProgressMap((prev) => {
      const updated = { ...prev };
      delete updated[courseId];
      return updated;
    });
  };

  if (loading) return <div className="text-center py-10">იტვირთება თქვენი კურსები...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-6">ჩემი კურსები</h1>

      {courses.length === 0 ? (
        <p className="text-gray-600">ჯერ არცერთ კურსში არ ხარ ჩაწერილი.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
              {/* ✅ Completed badge */}
              {progressMap[course.id] === 100 && (
                <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
                  დასრულებულია
                </div>
              )}

              <img
                src={course.thumbnailUrl}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{course.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>

                {progressMap[course.id] !== undefined && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 h-3 rounded">
                      <div
                        className="h-3 bg-blue-600 rounded"
                        style={{ width: `${progressMap[course.id]}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {progressMap[course.id]}% დასრულებული
                    </p>
                  </div>
                )}

                <Link
                  to={`/courses/${course.id}/content`}
                  className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  გაგრძელება
                </Link>

                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                  <button
                    className="text-green-600 hover:underline"
                    onClick={() => handleMarkComplete(course.id)}
                  >
                    ✅ დასრულებად მონიშვნა
                  </button>
                  <button
                    className="text-yellow-600 hover:underline"
                    onClick={() => handleResetProgress(course.id)}
                  >
                    🔁 პროგრესის განულება
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleUnenroll(course.id)}
                  >
                    🚫 კურსის გაუქმება
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
