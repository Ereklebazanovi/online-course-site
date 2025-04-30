// src/features/auth/Register.tsx
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register: form submitted", { displayName, email });
    setError(null);

    // 1) Check passwords match
    if (password !== confirm) {
      console.log("Register: password mismatch");
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      console.log("Register: creating user...");
      // 2) Create Firebase Auth user
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Register: user created", user.uid);

      // 3) Update displayName in Auth profile
      if (displayName.trim()) {
        console.log("Register: updating profile...");
        await updateProfile(user, { displayName: displayName.trim() });
        console.log("Register: profile updated");
      }

      // 4) Create user document in Firestore
      console.log("Register: writing Firestore document...");
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
        enrolledCourses: [],
        createdAt: serverTimestamp(),
      });
      console.log("Register: Firestore document written");

      // 5) Send email verification
      console.log("Register: sending verification email...");
      await sendEmailVerification(user);
      console.log("Register: verification email sent");

      // 6) Notify & redirect
      alert(
        "✅ Account created! Check your email to verify your address before logging in."
      );
      navigate("/login");
    } catch (err: any) {
      console.error("Register error:", err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
      console.log("Register: loading set to false");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Display Name */}
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Your full name"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="you@example.com"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="••••••••"
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block mb-1">Confirm Password</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? "Registering…" : "Register"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
