import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { db } from "../firebase";
import { Course } from "../types/Course";

const COURSES_PER_PAGE = 6;

export const fetchCourses = async (startAfterDoc?: DocumentData) => {
  let q = query(
    collection(db, "courses"),
    orderBy("createdAt", "desc"),
    limit(COURSES_PER_PAGE)
  );

  if (startAfterDoc) {
    q = query(q, startAfter(startAfterDoc));
  }

  const snapshot = await getDocs(q);
  const lastDoc = snapshot.docs[snapshot.docs.length - 1] || null;

  const courses: Course[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Course[];

  return { courses, lastDoc };
};
