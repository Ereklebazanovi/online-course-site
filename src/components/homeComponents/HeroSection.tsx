// import React, { FC } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';

// const HeroSection: FC = () => {
//   const { user } = useAuth();

//   return (
//     <section className="py-20 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
//       {user ? (
//         <>
//           <h1 className="text-4xl font-bold mb-4">Welcome back, {user.displayName || user.email}!</h1>
//           <Link to="/dashboard" className="mt-4 inline-block bg-white text-blue-600 py-3 px-6 rounded-lg">Go to Dashboard</Link>
//         </>
//       ) : (
//         <>
//           <h1 className="text-4xl font-bold mb-4">Unlock Your Potential with Expert-Led Courses</h1>
//           <p className="mb-6">Start your learning journey today and transform your future.</p>
//           <Link to="/courses" className="bg-white text-blue-600 py-3 px-6 rounded-lg mr-4">Explore Courses</Link>
//           <Link to="/register" className="border-2 border-white py-3 px-6 rounded-lg">Start Free Trial</Link>
//         </>
//       )}
//     </section>
//   );
// };

// export default HeroSection;

//// new
import { type FC, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { motion } from "framer-motion"

// You can replace these with actual images from your project
const HERO_IMAGE = "/placeholder.svg?height=600&width=600"
const PATTERN_BG = "/placeholder.svg?height=200&width=200"

// Featured courses data - replace with your actual data
const featuredCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    category: "Development",
    rating: 4.9,
    students: 12500,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Advanced Data Science & Machine Learning",
    category: "Data Science",
    rating: 4.8,
    students: 8300,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Digital Marketing Masterclass",
    category: "Marketing",
    rating: 4.7,
    students: 9700,
    image: "/placeholder.svg?height=200&width=300",
  },
]

// Stats for the hero section
const stats = [
  { value: "15K+", label: "Students" },
  { value: "200+", label: "Courses" },
  { value: "50+", label: "Instructors" },
  { value: "4.8", label: "Rating" },
]

const HeroSection: FC = () => {
  const { user } = useAuth()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${PATTERN_BG})`,
            backgroundSize: "100px",
            backgroundRepeat: "repeat",
          }}
        ></div>
      </div>

      {/* Main hero content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-16 pb-24 md:pt-20 md:pb-32 lg:pt-24 lg:pb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left column - Text content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-left"
            >
              {user ? (
                <>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                    Welcome back,{" "}
                    <span className="text-yellow-300">{user.displayName || user.email?.split("@")[0]}</span>!
                  </h1>
                  <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-xl">
                    Continue your learning journey with our expert-led courses. Your progress is waiting for you.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center px-8 py-4 bg-white text-blue-700 rounded-full font-bold shadow-lg hover:bg-blue-50 transition duration-300 text-lg"
                    >
                      My Dashboard
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                    <Link
                      to="/courses/recommended"
                      className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-blue-700 transition duration-300 text-lg"
                    >
                      Recommended For You
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <span className="inline-block px-4 py-1 rounded-full bg-blue-900 bg-opacity-50 text-blue-100 text-sm font-semibold mb-6">
                    TRANSFORM YOUR FUTURE WITH ONLINE LEARNING
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                    Unlock Your <span className="text-yellow-300">Potential</span> With Expert-Led Courses
                  </h1>
                  <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-xl">
                    Join thousands of students learning from industry experts and transforming their careers.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/courses"
                      className="inline-flex items-center px-8 py-4 bg-white text-blue-700 rounded-full font-bold shadow-lg hover:bg-blue-50 transition duration-300 text-lg"
                    >
                      Explore Courses
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                    <Link
                      to="/register"
                      className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-blue-700 transition duration-300 text-lg"
                    >
                      Start Free Trial
                    </Link>
                  </div>
                </>
              )}

              {/* Stats section */}
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                    <div className="text-blue-200">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right column - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:block"
            >
              <img
                src={HERO_IMAGE || "/placeholder.svg"}
                alt="Online learning illustration"
                className="w-full h-auto max-w-lg mx-auto rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Featured courses section */}
      <div className="relative bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Courses</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our most popular courses chosen by thousands of students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                    {course.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-5 w-5 ${i < Math.floor(course.rating) ? "text-yellow-400" : "text-gray-300"}`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">
                      {course.rating} ({course.students.toLocaleString()} students)
                    </span>
                  </div>
                  <Link
                    to={`/courses/${course.id}`}
                    className="block w-full text-center py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                  >
                    View Course
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/courses"
              className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition duration-300"
            >
              View All Courses
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
