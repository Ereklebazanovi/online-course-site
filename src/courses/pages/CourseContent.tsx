

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

//   function onLessonSelect(lesson: Lesson): void {
//     if (lesson.id !== selectedLesson?.id) {
//       handleLessonClick(lesson);
//     }
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


import { useParams, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Skeleton, Alert } from "antd";
import { useLoginModal } from "../../contexts/LoginModalContext";
import { useCourseContent } from "../hooks/useCourseContent";
import CourseSidebar from "../components/CourseSidebar";
import CourseVideoPlayer from "../components/CourseVideoPlayer";
import EnrollPrompt from "../components/EnrollPrompt";
import { Lesson } from "../types/Course";

const CourseContent = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const auth = getAuth();
  const { open: openLoginModal } = useLoginModal();

  const {
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
  } = useCourseContent(courseId!, auth, openLoginModal, location);

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

  const currentLessonIndex = lessons.findIndex(
    (lesson) => lesson.id === selectedLesson?.id
  );
  const nextLesson =
    currentLessonIndex >= 0 && currentLessonIndex < lessons.length - 1
      ? lessons[currentLessonIndex + 1]
      : null;
  const prevLesson =
    currentLessonIndex > 0 ? lessons[currentLessonIndex - 1] : null;

  const onLessonSelect = (lesson: Lesson): void => {
    if (lesson.id !== selectedLesson?.id) {
      handleLessonClick(lesson);
    }
  };

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
                  otp={otp}
                  playbackInfo={playbackInfo}
                  isLocked={!enrolled && !selectedLesson.isPreview}
                  switching={switching}
                  onNext={() => nextLesson && onLessonSelect(nextLesson)}
                  onPrev={() => prevLesson && onLessonSelect(prevLesson)}
                  hasNext={!!nextLesson}
                  hasPrev={!!prevLesson}
                />
              </>
            )}

            <EnrollPrompt
              enrolled={enrolled}
              user={user}
              onEnroll={handleEnroll}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
