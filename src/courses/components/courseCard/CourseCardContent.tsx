import { FC } from "react";
import { Tag } from "antd";
import { Course } from "../../types/Course";

const CourseCardContent: FC<{ course: Course }> = ({ course }) => (
  <div className="p-5 flex flex-col flex-grow">
    <div className="flex justify-between items-start mb-1">
      <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">
        {course.title}
      </h3>
      {course.category && (
        <Tag color="blue" className="ml-2 text-xs">
          {course.category}
        </Tag>
      )}
    </div>

    <p className="text-sm text-gray-600 mb-3 line-clamp-3 flex-grow">
      {course.description}
    </p>

    <div className="flex justify-between items-center mt-auto">
      <span className="bg-indigo-100 text-indigo-700 font-bold px-3 py-1 rounded-full text-sm">
        ${course.price}
      </span>
      <span className="text-white bg-indigo-600 hover:bg-indigo-700 transition font-semibold px-4 py-2 rounded text-sm">
        იხილეთ ვრცლად
      </span>
    </div>
  </div>
);

export default CourseCardContent;
