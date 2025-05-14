import { FC } from "react";
import { Course } from "../../types/Course";

const CourseCardMedia: FC<{ course: Course }> = ({ course }) => {
  return (
    <div className="relative w-full aspect-video overflow-hidden">
      {course.videoUrl?.includes("youtube.com") ? (
        <iframe
          src={course.videoUrl.replace("watch?v=", "embed/")}
          title={course.title}
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        />
      ) : (
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export default CourseCardMedia;
