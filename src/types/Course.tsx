export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnailUrl: string;
  videoUrl?: string;
  teacherName: string;
  category: string;
  createdAt: Date;
  level?: string;
}
