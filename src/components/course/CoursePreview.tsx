// // src/components/course/CoursePreview.tsx
// import { FC } from "react";

// interface Props { url: string; }

// const CoursePreview: FC<Props> = ({ url }) => {
//   // If it's a video URL, render a video; else show an image placeholder
//   const isVideo = url.endsWith(".mp4") || url.includes("youtube");
//   return isVideo ? (
//     <video src={url} controls className="w-full rounded-lg" />
//   ) : (
//     <img src={url} alt="Course Preview" className="w-full rounded-lg" />
//   );
// };

// export default CoursePreview;
