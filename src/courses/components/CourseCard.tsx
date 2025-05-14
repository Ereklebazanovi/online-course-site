import { FC } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Course } from "../types/Course";
import CourseCardMedia from "./courseCard/CourseCardMedia";
import CourseCardContent from "./courseCard/CourseCardContent";

interface Props {
  course: Course;
  index: number;
}

const CourseCard: FC<Props> = ({ course, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.4 }}
  >
    <Link to={`/courses/${course.id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col h-full">
        <CourseCardMedia course={course} />
        <CourseCardContent course={course} />
      </div>
    </Link>
  </motion.div>
);

export default CourseCard;
