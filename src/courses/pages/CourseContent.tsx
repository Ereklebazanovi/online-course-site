

// import { useParams, useLocation } from "react-router-dom";
// import { getAuth } from "firebase/auth";
// import { Skeleton, Alert } from "antd";
// import { useLoginModal } from "../../contexts/LoginModalContext";
// import { useCourseContent } from "../hooks/useCourseContent";
// import CourseSidebar from "../components/CourseSidebar";
// import CourseVideoPlayer from "../components/CourseVideoPlayer";
// import EnrollPrompt from "../components/EnrollPrompt";
// import { Lesson } from "../types/Course";

// const CourseContent = () => {
//   const { courseId } = useParams();
//   const location = useLocation();
//   const auth = getAuth();
//   const { open: openLoginModal } = useLoginModal();

//   const {
//     user,
//     loading,
//     error,
//     lessons,
//     selectedLesson,
//     enrolled,
//     otp,
//     playbackInfo,
//     switching,
//     handleLessonClick,
//     handleEnroll,
//   } = useCourseContent(courseId!, auth, openLoginModal, location);

//   if (loading) {
//     return (
//       <div className="max-w-6xl mx-auto px-4 py-10">
//         <Skeleton active paragraph={{ rows: 6 }} />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-4xl mx-auto px-4 py-10">
//         <Alert message={error} type="error" showIcon />
//       </div>
//     );
//   }

//   const currentLessonIndex = lessons.findIndex(
//     (lesson) => lesson.id === selectedLesson?.id
//   );
//   const nextLesson =
//     currentLessonIndex >= 0 && currentLessonIndex < lessons.length - 1
//       ? lessons[currentLessonIndex + 1]
//       : null;
//   const prevLesson =
//     currentLessonIndex > 0 ? lessons[currentLessonIndex - 1] : null;

//   const onLessonSelect = (lesson: Lesson): void => {
//     if (lesson.id !== selectedLesson?.id) {
//       handleLessonClick(lesson);
//     }
//   };

//   return (
//     <div className="p-8">
//       <div className="p-6 max-w-7xl mx-auto">
//         <div className="flex flex-col lg:flex-row gap-10">
//           <CourseSidebar
//             lessons={lessons}
//             selectedLesson={selectedLesson}
//             enrolled={enrolled}
//             onSelect={handleLessonClick}
//           />

//           <div className="lg:w-2/3 w-full space-y-6">
//             {selectedLesson && (
//               <>
//                 <h2 className="text-xl font-bold text-gray-800">
//                   {selectedLesson.title}
//                 </h2>

//                 <CourseVideoPlayer
//                   title={selectedLesson.title}
//                   otp={otp}
//                   playbackInfo={playbackInfo}
//                   isLocked={!enrolled && !selectedLesson.isPreview}
//                   switching={switching}
//                   onNext={() => nextLesson && onLessonSelect(nextLesson)}
//                   onPrev={() => prevLesson && onLessonSelect(prevLesson)}
//                   hasNext={!!nextLesson}
//                   hasPrev={!!prevLesson}
//                 />
//               </>
//             )}

//             <EnrollPrompt
//               enrolled={enrolled}
//               user={user}
//               onEnroll={handleEnroll}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseContent;


//BUNNy
// Updated CourseContent.tsx with lazy loading + optimized token fetching

import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { getAuth } from "firebase/auth";
import { useParams, useLocation } from "react-router-dom";
import { db } from "../../firebase";
import { Skeleton, Alert } from "antd";
import CourseSidebar from "../components/CourseSidebar";
import CourseVideoPlayer from "../components/CourseVideoPlayer";
import EnrollPrompt from "../components/EnrollPrompt";
import { useLoginModal } from "../../contexts/LoginModalContext";
import { Lesson } from "../types/Lesson";

const CourseContent = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const auth = getAuth();
  const { open: openLoginModal } = useLoginModal();

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [signedUrlCache] = useState(() => new Map<string, string>());
  const [loadingLessons, setLoadingLessons] = useState(false);
  const [lastDoc, setLastDoc] = useState<DocumentData | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [enrolled, setEnrolled] = useState(false); // Replace with your actual enrollment logic
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [switching, setSwitching] = useState(false);

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    if (!courseId || loadingLessons || !hasMore) return;
    setLoadingLessons(true);
    try {
      const ref = collection(db, "courses", courseId, "lessons");
      const q = lastDoc
        ? query(ref, orderBy("order"), startAfter(lastDoc), limit(10))
        : query(ref, orderBy("order"), limit(10));

      const snapshot = await getDocs(q);
      const newLessons = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Lesson[];

      setLessons((prev) => [...prev, ...newLessons]);
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      setLastDoc(lastVisible);
      setHasMore(snapshot.docs.length === 10);
      setLoading(false);
      if (!selectedLesson && newLessons.length > 0) {
        setSelectedLesson(newLessons[0]);
      }
    } catch (err) {
      setError("Failed to load lessons.");
    } finally {
      setLoadingLessons(false);
    }
  };

  const handleEnroll = () => {
    if (!auth.currentUser) {
      openLoginModal();
      return;
    }
    // Enroll logic here
    setEnrolled(true);
  };

  const handleLessonClick = async (lesson: Lesson) => {
    setSwitching(true);
    setSelectedLesson(lesson);
    setSwitching(false);
  };

  const currentLessonIndex = lessons.findIndex(
    (lesson) => lesson.id === selectedLesson?.id
  );
  const nextLesson =
    currentLessonIndex >= 0 && currentLessonIndex < lessons.length - 1
      ? lessons[currentLessonIndex + 1]
      : null;
  const prevLesson =
    currentLessonIndex > 0 ? lessons[currentLessonIndex - 1] : null;

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
          <CourseSidebar
            lessons={lessons}
            selectedLesson={selectedLesson}
            enrolled={enrolled}
            onSelect={handleLessonClick}
          />

          <div className="lg:w-2/3 w-full space-y-6">
            {selectedLesson && (
              <>
                <h2 className="text-xl font-bold text-gray-800">
                  {selectedLesson.title}
                </h2>

                <CourseVideoPlayer
                  title={selectedLesson.title}
                  bunnyVideoId={selectedLesson.bunnyVideoId || undefined}
                  isLocked={!enrolled && !selectedLesson.isPreview}
                  switching={switching}
                  onNext={() => nextLesson && handleLessonClick(nextLesson)}
                  onPrev={() => prevLesson && handleLessonClick(prevLesson)}
                  hasNext={!!nextLesson}
                  hasPrev={!!prevLesson}
                />
              </>
            )}

            <EnrollPrompt
              enrolled={enrolled}
              user={auth.currentUser}
              onEnroll={handleEnroll}
            />

            {hasMore && (
              <button
                className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded"
                onClick={fetchLessons}
                disabled={loadingLessons}
              >
                {loadingLessons ? "Loading more..." : "Load More Lessons"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
