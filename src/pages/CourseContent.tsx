import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  getDocs,
  collection,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import Skeleton from "antd/es/skeleton";
import Button from "antd/es/button";
import Alert from "antd/es/alert";
import {
  LockOutlined,
  PlayCircleOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { useLoginModal } from "../contexts/LoginModalContext";

interface Lesson {
  id: string;
  title: string;
  videoUrl: string;
  isPreview?: boolean;
  position?: number;
}

const getEmbedUrl = (url: string): string => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

const CourseContent = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const auth = getAuth();
  const { open: openLoginModal } = useLoginModal();

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [switching, setSwitching] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (!courseId) return;

      try {
        const courseRef = doc(db, "courses", courseId);
        const courseSnap = await getDoc(courseRef);
        if (!courseSnap.exists()) {
          setError("Course not found.");
          setLoading(false);
          return;
        }

        const lessonsSnap = await getDocs(
          collection(db, "courses", courseId, "lessons")
        );

        const lessonsData: Lesson[] = lessonsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Lesson[];

        const sortedLessons = lessonsData
          .sort((a, b) => (a.position ?? 999) - (b.position ?? 999))
          .sort((a, b) => {
            const aOpen = enrolled || a.isPreview;
            const bOpen = enrolled || b.isPreview;
            return aOpen === bOpen ? 0 : aOpen ? -1 : 1;
          });

        setLessons(sortedLessons);
        const firstAvailable = sortedLessons.find(
          (lesson) => enrolled || lesson.isPreview
        );
        setSelectedLesson(firstAvailable || sortedLessons[0]);

        if (u) {
          const userRef = doc(db, "users", u.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.data()?.enrolledCourses?.includes(courseId)) {
            setEnrolled(true);
          }
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to load content.");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [courseId]);

  const handleLessonClick = (lesson: Lesson) => {
    const isAccessible = enrolled || lesson.isPreview;
    if (!isAccessible) return;
    if (lesson.id === selectedLesson?.id) return;
    setSwitching(true);
    setTimeout(() => {
      setSelectedLesson(lesson);
      setSwitching(false);
    }, 250);
  };

  const handleEnroll = async () => {
    if (!user) {
      openLoginModal({ redirectTo: location.pathname });
    } else {
      try {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          enrolledCourses: arrayUnion(courseId),
          [`progress.${courseId}`]: 0,
        });

        await setDoc(doc(db, "purchases", `${user.uid}_${courseId}`), {
          userId: user.uid,
          courseId,
          status: "paid",
          createdAt: serverTimestamp(),
        });

        setEnrolled(true);
      } catch (err) {
        console.error("Enrollment failed", err);
        setError("Something went wrong while enrolling.");
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <Skeleton active paragraph={{ rows: 6 }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Alert message={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <div className="lg:w-1/3 w-full space-y-5">
            <h2 className="text-2xl font-bold text-gray-800">Course Lessons</h2>
            <ul className="space-y-2">
              {lessons.map((lesson) => {
                const isUnlocked = enrolled || lesson.isPreview;
                return (
                  <li
                    key={lesson.id}
                    onClick={() => handleLessonClick(lesson)}
                    className={`p-3 rounded-lg border flex justify-between items-center cursor-pointer transition ${
                      selectedLesson?.id === lesson.id
                        ? "bg-indigo-100 border-indigo-400"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {isUnlocked ? (
                        <PlayCircleOutlined className="text-green-500" />
                      ) : (
                        <LockOutlined className="text-gray-400" />
                      )}
                      {lesson.title}
                    </span>
                    {lesson.isPreview && !enrolled && (
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                        Preview
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Main Content */}
          <div className="lg:w-2/3 w-full space-y-6">
            {selectedLesson && (
              <>
                <h2 className="text-xl font-bold text-gray-800">
                  {selectedLesson.title}
                </h2>

                {switching ? (
                  <div className="aspect-video bg-gray-100 animate-pulse rounded-xl" />
                ) : enrolled || selectedLesson.isPreview ? (
                  <div className="aspect-video rounded-xl overflow-hidden shadow">
                    <iframe
                      key={selectedLesson.id}
                      src={getEmbedUrl(selectedLesson.videoUrl)}
                      title={selectedLesson.title}
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg text-sm flex items-center gap-2 shadow-sm">
                    <LockOutlined /> This lesson is locked. Please enroll to
                    unlock.
                  </div>
                )}
              </>
            )}

            {!enrolled && (
              <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl text-center shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Want full access?
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Get lifetime access to all lessons, projects, and a
                  certificate of completion.
                </p>
                <Button
                  type="primary"
                  icon={!user ? <LoginOutlined /> : undefined}
                  onClick={handleEnroll}
                  className="bg-indigo-600 hover:bg-indigo-700 border-none rounded-full px-8"
                >
                  {user ? "Enroll Now" : "Login to Enroll"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
