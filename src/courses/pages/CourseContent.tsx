// import {
//   collection,
//   query,
//   orderBy,
//   limit,
//   startAfter,
//   getDocs,
//   DocumentData,
// } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { getAuth } from "firebase/auth";
// import { useParams, useNavigate } from "react-router-dom";
// import { db } from "../../firebase";
// import { Skeleton, Alert } from "antd";
// import CourseSidebar from "../components/CourseSidebar";
// import CourseVideoPlayer from "../components/CourseVideoPlayer";
// import EnrollPrompt from "../components/EnrollPrompt";
// import { useLoginModal } from "../../contexts/LoginModalContext";
// import { Lesson } from "../types/Lesson";

// const CourseContent = () => {
//   const { courseId, lessonId } = useParams();
//   const navigate = useNavigate();
//   const auth = getAuth();
//   const { open: openLoginModal } = useLoginModal();

//   const [lessons, setLessons] = useState<Lesson[]>([]);
//   const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
//   const [signedUrlCache] = useState(() => new Map<string, string>());
//   const [loadingLessons, setLoadingLessons] = useState(false);
//   const [lastDoc, setLastDoc] = useState<DocumentData | null>(null);
//   const [hasMore, setHasMore] = useState(true);
//   const [enrolled, setEnrolled] = useState(false); // Replace with your actual enrollment logic
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [switching, setSwitching] = useState(false);

//   useEffect(() => {
//     fetchLessons();
//   }, []);

//   const fetchLessons = async () => {
//     if (!courseId || loadingLessons || !hasMore) return;
//     setLoadingLessons(true);
//     try {
//       const ref = collection(db, "courses", courseId, "lessons");
//       const q = lastDoc
//         ? query(ref, orderBy("position"), startAfter(lastDoc), limit(10))
//         : query(ref, orderBy("position"), limit(10));

//       const snapshot = await getDocs(q);
//       const newLessons = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as Lesson[];

//       setLessons((prev) => [...prev, ...newLessons]);
//       const lastVisible = snapshot.docs[snapshot.docs.length - 1];
//       setLastDoc(lastVisible);
//       setHasMore(snapshot.docs.length === 10);
//       setLoading(false);

//       if (!selectedLesson) {
//         const initialLesson = lessonId
//           ? newLessons.find((l) => l.id === lessonId)
//           : newLessons[0];
//         if (initialLesson) {
//           setSelectedLesson(initialLesson);
//         }
//       }
//     } catch (err) {
//       setError("Failed to load lessons.");
//     } finally {
//       setLoadingLessons(false);
//     }
//   };

//   const handleEnroll = () => {
//     if (!auth.currentUser) {
//       openLoginModal();
//       return;
//     }
//     // Enroll logic here
//     setEnrolled(true);
//   };

//   const handleLessonClick = (lesson: Lesson) => {
//     setSwitching(true);
//     navigate(`/courses/${courseId}/content/${lesson.id}`);
//     setSelectedLesson(lesson);
//     setSwitching(false);
//   };

//   const currentLessonIndex = lessons.findIndex(
//     (lesson) => lesson.id === selectedLesson?.id
//   );
//   const nextLesson =
//     currentLessonIndex >= 0 && currentLessonIndex < lessons.length - 1
//       ? lessons[currentLessonIndex + 1]
//       : null;
//   const prevLesson =
//     currentLessonIndex > 0 ? lessons[currentLessonIndex - 1] : null;

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
//                   key={selectedLesson.id}
//                   title={selectedLesson.title}
//                   bunnyVideoId={selectedLesson.bunnyVideoId || undefined}
//                   isLocked={!enrolled && !selectedLesson.isPreview}
//                   switching={switching}
//                   onNext={() => nextLesson && handleLessonClick(nextLesson)}
//                   onPrev={() => prevLesson && handleLessonClick(prevLesson)}
//                   hasNext={!!nextLesson}
//                   hasPrev={!!prevLesson}
//                 />
//               </>
//             )}

//             <EnrollPrompt
//               enrolled={enrolled}
//               user={auth.currentUser}
//               onEnroll={handleEnroll}
//             />

//             {hasMore && (
//               <button
//                 className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded"
//                 onClick={fetchLessons}
//                 disabled={loadingLessons}
//               >
//                 {loadingLessons ? "Loading more..." : "Load More Lessons"}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseContent;

///react Query

import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { Skeleton, Alert } from "antd";
import CourseSidebar from "../components/CourseSidebar";
import CourseVideoPlayer from "../components/CourseVideoPlayer";
import EnrollPrompt from "../components/EnrollPrompt";
import { useLoginModal } from "../../contexts/LoginModalContext";
import { Lesson } from "../types/Lesson";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import type { QueryFunctionContext, InfiniteData } from "@tanstack/react-query";

const LESSONS_LIMIT = 10;

type LessonPage = {
  lessons: Lesson[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
};

// Define specific types for clarity
type QueryKeyType = readonly [string, string | undefined];
type PageParamType = QueryDocumentSnapshot<DocumentData> | undefined;

// Updated fetchLessons with matching types
const fetchLessons = async ({
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKeyType, PageParamType>): Promise<LessonPage> => {
  const [, courseId] = queryKey;
  if (!courseId) throw new Error("Missing courseId");

  const ref = collection(db, "courses", courseId, "lessons");
  const q = pageParam
    ? query(
        ref,
        orderBy("position"),
        startAfter(pageParam),
        limit(LESSONS_LIMIT)
      )
    : query(ref, orderBy("position"), limit(LESSONS_LIMIT));

  const snapshot = await getDocs(q);
  const newLessons = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Lesson[];

  const lastDoc =
    snapshot.docs.length === LESSONS_LIMIT
      ? snapshot.docs[snapshot.docs.length - 1]
      : null;

  return { lessons: newLessons, lastDoc };
};

const CourseContent = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const auth = getAuth();
  const { open: openLoginModal } = useLoginModal();

  const [enrolled, setEnrolled] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [switching, setSwitching] = useState(false);

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<
    LessonPage, // TQueryFnData
    Error, // TError
    InfiniteData<LessonPage, PageParamType>, // TData
    QueryKeyType, // TQueryKey
    PageParamType // TPageParam
  >({
    queryKey: ["lessons", courseId],
    queryFn: fetchLessons,
    getNextPageParam: (lastPage) => lastPage.lastDoc ?? undefined,
    initialPageParam: undefined,
    enabled: !!courseId,
  });

  const allLessons = useMemo<Lesson[]>(() => {
    return data?.pages.flatMap((page) => page.lessons) || [];
  }, [data]);

  useEffect(() => {
    if (!selectedLesson && allLessons.length > 0) {
      const found = lessonId
        ? allLessons.find((lesson) => lesson.id === lessonId)
        : allLessons[0];
      setSelectedLesson(found || null);
    }
  }, [allLessons, lessonId, selectedLesson]);

  const handleEnroll = () => {
    if (!auth.currentUser) return openLoginModal();
    setEnrolled(true);
  };

  const handleLessonClick = (lesson: Lesson) => {
    setSwitching(true);
    navigate(`/courses/${courseId}/content/${lesson.id}`);
    setSelectedLesson(lesson);
    setSwitching(false);
  };

  const currentLessonIndex = allLessons.findIndex(
    (lesson) => lesson.id === selectedLesson?.id
  );
  const nextLesson =
    currentLessonIndex >= 0 && currentLessonIndex < allLessons.length - 1
      ? allLessons[currentLessonIndex + 1]
      : null;
  const prevLesson =
    currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <Skeleton active paragraph={{ rows: 6 }} />
      </div>
    );
  }

  if (error || !courseId) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Alert
          message={
            error instanceof Error ? error.message : "Failed to load lessons."
          }
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10">
          <CourseSidebar
            lessons={allLessons}
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
                  key={selectedLesson.id}
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

            {hasNextPage && (
              <button
                className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? "Loading more..." : "Load More Lessons"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
