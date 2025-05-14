import { useEffect, useState } from "react";
import {
  getDoc,
  getDocs,
  doc,
  collection,
  updateDoc,
  arrayUnion,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Auth, User } from "firebase/auth";
import { db } from "../../firebase";
import { Location } from "react-router-dom";
import { Lesson } from "../types/Course";

export const useCourseContent = (
  courseId: string,
  auth: Auth,
  openLoginModal: (opts: { redirectTo: string }) => void,
  location: Location
) => {
  const [user, setUser] = useState<User | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [switching, setSwitching] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState<string | null>(null);
  const [playbackInfo, setPlaybackInfo] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (u: User | null) => {
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
        const lessonsData = lessonsSnap.docs.map((doc) => ({
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
        setError("Failed to load course.");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [courseId]);

  useEffect(() => {
    const fetchOtp = async () => {
      if (!selectedLesson?.videoId || (!enrolled && !selectedLesson.isPreview))
        return;
      try {
        const res = await fetch("http://localhost:4000/get-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ videoId: selectedLesson.videoId }),
        });
        const { otp, playbackInfo } = await res.json();
        setOtp(otp);
        setPlaybackInfo(playbackInfo);
      } catch (err) {
        console.error("Failed to fetch OTP", err);
        setOtp(null);
        setPlaybackInfo(null);
      }
    };

    fetchOtp();
  }, [selectedLesson, enrolled]);

  const handleLessonClick = (lesson: Lesson) => {
    const isAccessible = enrolled || lesson.isPreview;
    if (!isAccessible || lesson.id === selectedLesson?.id) return;
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

  // ✅ Next & Previous Navigation
  const currentIndex = lessons.findIndex((l) => l.id === selectedLesson?.id);
  const nextLesson = lessons.find(
    (_, index) => index > currentIndex && (enrolled || lessons[index].isPreview)
  );
  const prevLesson = lessons
    .slice(0, currentIndex) // get all lessons before current
    .reverse()
    .find((lesson) => enrolled || lesson.isPreview);

  return {
    user,
    loading,
    error,
    lessons,
    selectedLesson,
    enrolled,
    otp,
    playbackInfo,
    switching,
    handleLessonClick,
    handleEnroll,
    nextLesson,
    prevLesson,
    onLessonSelect: setSelectedLesson, // optional alias
  };
};
