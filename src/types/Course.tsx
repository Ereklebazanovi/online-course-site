export interface Course {
    id: string;
    title: string;
    description: string;
    price: number;
    thumbnailUrl: string;
    videoUrl?: string;
    teacherName: string;
    category: string;
    createdAt: any; // Or Timestamp if you import from Firebase
  }
  