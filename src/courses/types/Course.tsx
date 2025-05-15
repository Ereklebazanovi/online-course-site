export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnailUrl: string;

  // 🔄 Replace or remove this if not using VdoCipher
  videoId?: string;

  // ✅ Add Bunny video support
  bunnyVideoId?: string;

  teacherName: string;
  category: string;
  createdAt: string;
  level?: string;
  isFree?: boolean;
}
