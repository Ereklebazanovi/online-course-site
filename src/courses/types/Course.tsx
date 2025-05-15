// export interface Course {
//   id: string;
//   title: string;
//   description: string;
//   price: number;
//   thumbnailUrl: string;
//   videoUrl?: string;
//   teacherName: string;
//   category: string;
//   createdAt: Date;
//   level?: string;
// }


// src/types/Course.ts

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnailUrl: string;

  // 🔒 New: VdoCipher ID replaces YouTube URL
  videoId?: string; // VdoCipher video reference
// videoUrl?: string; // YouTube URL for legacy support
  teacherName: string;
  category: string;
  createdAt: string;

  // 🔁 Optional fields for filtering or tagging
  level?: string;

  // ✅ Optional preview flag
  isFree?: boolean;
}


export interface Lesson {
  id: string;
  title: string;
  videoId: string;
  isPreview?: boolean;
  position?: number;
}
