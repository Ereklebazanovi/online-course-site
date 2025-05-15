import { FC } from "react";
import { Course } from "../../types/Course";

const CourseCardMedia: FC<{ course: Course }> = ({ course }) => {
  return (
    <div className="relative w-full aspect-video overflow-hidden">
      <img
        src={course.thumbnailUrl}
        alt={course.title}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default CourseCardMedia;
