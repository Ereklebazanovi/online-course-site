import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // adjust path if needed
import { Course } from "../types/Course";

export const fetchCourses = async (): Promise<Course[]> => {
  const coursesRef = collection(db, "courses");
  const snapshot = await getDocs(coursesRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Course[];
};
