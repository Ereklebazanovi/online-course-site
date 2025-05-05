// import { type FC, useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../../contexts/AuthContext";
// import { motion } from "framer-motion";

// const HeroSection: FC = () => {
//   const { user } = useAuth();
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   return (
//     <div className="relative overflow-hidden bg-gradient-to-br from-[#f5f9ff] to-[#eaf3fe]">
//       {/* Blob Background */}
//       <div className="absolute -top-40 -left-40 z-0 opacity-20 pointer-events-none">
//         <svg
//           viewBox="0 0 200 200"
//           xmlns="http://www.w3.org/2000/svg"
//           className="w-[600px] h-[600px]"
//         >
//           <path
//             fill="#d0eaff"
//             d="M55.6,-60.9C70.1,-45.6,79.3,-22.8,77.5,-2.5C75.7,17.8,62.9,35.6,48.5,50.6C34.1,65.6,17.1,77.8,-2.4,80.2C-21.8,82.6,-43.7,75.2,-59.1,60.2C-74.5,45.2,-83.3,22.6,-82.1,0.9C-81,-20.7,-69.9,-41.3,-54.6,-56.4C-39.3,-71.4,-19.7,-81.1,2.4,-83.5C24.5,-86,49.1,-81.2,55.6,-60.9Z"
//             transform="translate(100 100)"
//           />
//         </svg>
//       </div>

//       {/* Hero Content */}
//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="pt-20 pb-28 md:pt-24 md:pb-36 lg:pt-28 lg:pb-44">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
//             {/* Text Content */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="text-left"
//             >
//               <span className="inline-block px-4 py-1 rounded-full bg-blue-800 bg-opacity-70 text-blue-100 text-sm font-semibold mb-6 tracking-wide shadow-sm">
//                 ისწავლე რაც მნიშვნელოვანია ✨
//               </span>

//               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight mb-6">
//                 {user ? (
//                   <>
//                     Thank you for coming back,{" "}
//                     <span className="text-blue-600">
//                       {user.displayName || user.email?.split("@")[0]}
//                     </span>
//                     .
//                   </>
//                 ) : (
//                   <>
//                     Welcome to the{" "}
//                     <span className="text-blue-600">alternative world</span> of
//                     learning.
//                   </>
//                 )}
//               </h1>

//               <p className="text-lg text-gray-600 mb-8 max-w-xl">
//                 {user
//                   ? "Continue your journey with our immersive, instructor-led courses."
//                   : "Break away from traditional education — explore knowledge your way."}
//               </p>

//               <div className="flex flex-wrap gap-4">
//                 {user ? (
//                   <>
//                     <Link
//                       to="/dashboard"
//                       className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 transition text-lg"
//                     >
//                       Go to Dashboard
//                     </Link>
//                     <Link
//                       to="/courses"
//                       className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition text-lg"
//                     >
//                       Explore Courses
//                     </Link>
//                   </>
//                 ) : (
//                   <>
//                     <Link
//                       to="/courses"
//                       className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 transition text-lg"
//                     >
//                       View Courses
//                     </Link>
//                     <Link
//                       to="/register"
//                       className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition text-lg"
//                     >
//                       Get Started
//                     </Link>
//                   </>
//                 )}
//               </div>
//             </motion.div>

//             {/* Video Section */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//               className="hidden lg:block"
//             >
//               <div className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-xl aspect-[16/9]">
//                 <iframe
//                   src="https://www.youtube.com/embed/Mg9yzpeICo4"
//                   title="Welcome to the Alternative World"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                   className="w-full h-full"
//                 />
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;


/////axali

"use client";
import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../../../contexts/AuthContext";
import HeroHeading from "./HeroHeading";
import HeroDescription from "./HeroDescription";
import HeroCTA from "./HeroCTA";
import HeroVideo from "./HeroVideo";
import HeroBackground from "./HeroBackground";

const HeroSection: FC = () => {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#f5f9ff] to-[#eaf3fe]">
      <HeroBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-28 md:pt-24 md:pb-36 lg:pt-28 lg:pb-44">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-left"
            >
              <HeroHeading user={user} />
              <HeroDescription user={user} />
              <HeroCTA user={user} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:block"
            >
              <HeroVideo />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
