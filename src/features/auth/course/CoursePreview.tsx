// src/components/CoursePreview.tsx
import React from 'react';

interface Props {
  url: string;
}

const CoursePreview: React.FC<Props> = ({ url }) => {
  const isYoutube = url.includes('youtube.com') || url.includes('youtu.be');

  return (
    <div className="w-full aspect-video mb-4">
      {isYoutube ? (
        <iframe
          className="w-full h-full rounded"
          src={url.replace('watch?v=', 'embed/')}
          title="Course Preview"
          allowFullScreen
        ></iframe>
      ) : (
        <video className="w-full rounded" src={url} controls />
      )}
    </div>
  );
};

export default CoursePreview;
