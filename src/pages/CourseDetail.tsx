// src/pages/CourseDetail.tsx
import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// these two components you just added
import CoursePreview from "../components/CoursePreview";
import CheckoutForm from "../components/CheckoutForm";

interface Course {
  title: string;
  description: string;
  price: number;
  syllabus: string[];
  instructor: { name: string; bio: string; avatar: string };
  previewUrl: string;
}

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { user, purchasedCourses } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const ref = doc(db, "courses", slug!);
      const snap = await getDoc(ref);
      if (snap.exists()) setCourse(snap.data() as Course);
      setLoading(false);
    })();
  }, [slug]);

  if (loading) return <div className="p-8">Loading…</div>;
  if (!course) return <Navigate to="/courses" replace />;

  const isBought = purchasedCourses.includes(slug!);
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK!);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: preview, description, syllabus, instructor */}
        <div className="md:w-2/3 space-y-4">
          {/* 🚀 Preview player */}
          <CoursePreview url={course.previewUrl} />

          <p>{course.description}</p>

          <h2 className="text-xl font-semibold mt-6">Syllabus</h2>
          <ul className="list-disc ml-6">
            {course.syllabus.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h2 className="text-xl font-semibold mt-6">Instructor</h2>
          <div className="flex items-center gap-4">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <p className="font-medium">{course.instructor.name}</p>
              <p className="text-sm text-gray-600">{course.instructor.bio}</p>
            </div>
          </div>
        </div>

        {/* Right: pricing and buy/continue */}
        <div className="md:w-1/3 space-y-4 p-4 border rounded">
          <p className="text-2xl font-bold">${course.price.toFixed(2)}</p>

          {isBought ? (
            <button
              onClick={() => window.location.assign(`/courses/${slug}/content`)}
              className="w-full bg-green-600 text-white py-2 rounded"
            >
              Continue Course
            </button>
          ) : (
            <Elements stripe={stripePromise}>
              <CheckoutForm courseId={slug!} amount={course.price} />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
}
