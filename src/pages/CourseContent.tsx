// src/pages/CourseContent.tsx
import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const CourseContent: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    if (!user) return;

    (async () => {
      // Check in "purchases" collection for a paid record
      const q = query(
        collection(db, "purchases"),
        where("userId", "==", user.uid),
        where("courseSlug", "==", slug),
        where("status", "==", "paid")
      );
      const snap = await getDocs(q);
      setHasAccess(!snap.empty);
    })();
  }, [user, slug]);

  if (hasAccess === null) {
    return <div className="p-6 text-center">Checking access…</div>;
  }

  if (!hasAccess) {
    // no paid purchase found → redirect home
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* TODO: replace this placeholder with your real video player or lesson UI */}
      <h1 className="text-2xl font-bold mb-4">
        Course Content for &ldquo;{slug}&rdquo;
      </h1>
      <p>🎉 You have access! Now build out your lesson player here.</p>
    </div>
  );
};

export default CourseContent;
