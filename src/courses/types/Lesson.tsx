export interface Lesson {
  id: string;
  title: string;

  // ✅ Keep for backwards compatibility if needed
  videoId?: string;

  // ✅ New Bunny field
  bunnyVideoId?: string;

  isPreview?: boolean;
  position?: number;
}
