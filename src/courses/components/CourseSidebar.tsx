import { FC, memo } from "react";
import { LockOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Lesson } from "../types/Lesson";

interface Props {
  lessons: Lesson[];
  selectedLesson: Lesson | null;
  enrolled: boolean;
  onSelect: (lesson: Lesson) => void;
}

const CourseSidebar: FC<Props> = ({ lessons, selectedLesson, enrolled, onSelect }) => {
  return (
    <div className="lg:w-1/3 w-full space-y-5">
      <h2 className="text-2xl font-bold text-gray-800">Course Lessons</h2>

      {lessons.length === 0 ? (
        <p className="text-sm text-gray-500">No lessons available yet.</p>
      ) : (
        <ul className="space-y-2">
          {lessons.map((lesson) => {
            const isUnlocked = enrolled || lesson.isPreview;
            return (
              <li
                key={lesson.id}
                onClick={() => isUnlocked && onSelect(lesson)}
                className={`p-3 rounded-lg border flex justify-between items-center cursor-pointer transition ${
                  selectedLesson?.id === lesson.id
                    ? "bg-indigo-100 border-indigo-400"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                <span className="flex items-center gap-2">
                  {isUnlocked ? (
                    <PlayCircleOutlined className="text-green-500" />
                  ) : (
                    <LockOutlined className="text-gray-400" />
                  )}
                  {lesson.title}
                </span>
                {lesson.isPreview && !enrolled && (
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                    Preview
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default memo(CourseSidebar);
