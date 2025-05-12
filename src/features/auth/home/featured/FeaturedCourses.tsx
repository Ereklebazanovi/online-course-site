// import { useEffect, useState } from "react";
// import { fetchCourses } from "../../../services/courseService";
// import { Course } from "../../../types/Course";
// import { Link } from "react-router-dom";
// import { Tag } from "antd";
// import Skeleton from "antd/es/skeleton";
// import { motion } from "framer-motion";

// const FeaturedCourses = () => {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadCourses = async () => {
//       try {
//         const data = await fetchCourses();
//         setCourses(data);
//       } catch (error) {
//         console.error("Failed to fetch courses:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadCourses();
//   }, []);

//   if (loading) {
//     return (
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
//         {[...Array(6)].map((_, i) => (
//           <Skeleton
//             key={i}
//             active
//             paragraph={{ rows: 3 }}
//             className="rounded-xl"
//           />
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
//           🌟 შემოთავაზებული კურსები
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {courses.map((course, index) => (
//             <motion.div
//               key={course.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1, duration: 0.4 }}
//             >
//               <Link to={`/courses/${course.id}`}>
//                 <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col h-full">
//                   {/* Media Block */}
//                   <div className="relative w-full aspect-video overflow-hidden">
//                     {course.videoUrl &&
//                     course.videoUrl.includes("youtube.com") ? (
//                       <iframe
//                         src={course.videoUrl.replace("watch?v=", "embed/")}
//                         title={course.title}
//                         allowFullScreen
//                         className="absolute top-0 left-0 w-full h-full"
//                       />
//                     ) : (
//                       <img
//                         src={course.thumbnailUrl}
//                         alt={course.title}
//                         className="w-full h-full object-cover"
//                       />
//                     )}
//                   </div>

//                   {/* Content Block */}
//                   <div className="p-5 flex flex-col flex-grow">
//                     <div className="flex justify-between items-start mb-1">
//                       <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">
//                         {course.title}
//                       </h3>
//                       {course.category && (
//                         <Tag color="blue" className="ml-2 text-xs">
//                           {course.category}
//                         </Tag>
//                       )}
//                     </div>

//                     <p className="text-sm text-gray-600 mb-3 line-clamp-3 flex-grow">
//                       {course.description}
//                     </p>

//                     <div className="flex justify-between items-center mt-auto">
//                       <span className="bg-indigo-100 text-indigo-700 font-bold px-3 py-1 rounded-full text-sm">
//                         ${course.price}
//                       </span>

//                       <button className="text-white bg-indigo-600 hover:bg-indigo-700 transition font-semibold px-4 py-2 rounded text-sm">
//                         იხილეთ ვრცლად
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeaturedCourses;


// import { useEffect, useState } from "react";
// import { fetchCourses } from "../../../../services/courseService";
// import { Course } from "../../../../types/Course";
// import Skeleton from "antd/es/skeleton";
// import CourseCard from "./CourseCard";

// const FeaturedCourses = () => {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadCourses = async () => {
//       try {
//         const data = await fetchCourses();
//         setCourses(data);
//       } catch (error) {
//         console.error("Failed to fetch courses:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadCourses();
//   }, []);

//   if (loading) {
//     return (
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
//         {[...Array(6)].map((_, i) => (
//           <Skeleton key={i} active paragraph={{ rows: 3 }} className="rounded-xl" />
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
//           🌟 შემოთავაზებული კურსები
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {courses.map((course, index) => (
//             <CourseCard key={course.id} course={course} index={index} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeaturedCourses;





import { useEffect, useState } from "react";
import { fetchCourses } from "../../../../services/courseService";
import { Course } from "../../../../types/Course";
import Skeleton from "antd/es/skeleton";
import { Button } from "antd";
import CourseCard from "./CourseCard";
import { DocumentData } from "firebase/firestore";

const FeaturedCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [lastDoc, setLastDoc] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadCourses = async (initial = false) => {
    if (initial) setLoading(true);
    else setLoadingMore(true);

    try {
      const result = await fetchCourses(initial ? undefined : lastDoc || undefined);
      setCourses((prev) => [...prev, ...result.courses]);
      setLastDoc(result.lastDoc);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      if (initial) setLoading(false);
      else setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadCourses(true);
  }, []);

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          🌟 შემოთავაზებული კურსები
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
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
              ))}
            </div>

            {/* {lastDoc && (
              <div className="text-center mt-10">
                <Button
                  onClick={() => loadCourses()}
                  loading={loadingMore}
                  className="bg-blue-600 text-white hover:bg-blue-700 font-semibold px-6 py-2 rounded"
                >
                  Load More
                </Button>
              </div>
            )} */}
          </>
        )}
      </div>
    </div>
  );
};

export default FeaturedCourses;
