// src/features/auth/Register.tsx
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Register() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    setError("");
    setSuccess(false);
    if (password !== confirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName.trim()) {
        await updateProfile(user, { displayName: displayName.trim() });
      }
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName,
        createdAt: serverTimestamp(),
      });
      await sendEmailVerification(user, {
        url: "http://localhost:5173/login",
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Create your account
        </h2>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
            Registration successful! Please check your email to verify your account.
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              disabled={loading}
              className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              disabled={loading}
              className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full flex justify-center mt-6 py-2 px-4 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Sign Up'}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

// "use client"

// import { useState } from "react"
// import { auth, db } from "../../firebase"
// import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth"
// import { doc, setDoc, serverTimestamp } from "firebase/firestore"

// const Register = () => {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")
//   const [displayName, setDisplayName] = useState("")
//   const [error, setError] = useState("")
//   const [passwordError, setPasswordError] = useState("")
//   const [success, setSuccess] = useState(false)
//   const [loading, setLoading] = useState(false)

//   const validatePasswords = () => {
//     if (password !== confirmPassword) {
//       setPasswordError("Passwords do not match")
//       return false
//     }
//     setPasswordError("")
//     return true
//   }

//   const handleRegister = async () => {
//     // Validate passwords match before proceeding
//     if (!validatePasswords()) {
//       return
//     }

//     setLoading(true)
//     setError("")
//     setSuccess(false)
//     try {
//       // Create user with Firebase Authentication
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password)
//       const user = userCredential.user
//       console.log("User created:", user.uid)

//       // Update user profile with display name
//       await updateProfile(user, { displayName })
//       console.log("Profile updated")

//       // Send email verification
//       await sendEmailVerification(user)
//       console.log("Email verification sent")

//       // Write user data to Firestore
//       await setDoc(doc(db, "users", user.uid), {
//         uid: user.uid,
//         email: user.email,
//         displayName,
//         createdAt: serverTimestamp(), // Use server timestamp for accuracy
//       })
//       console.log("Firestore write successful")

//       setSuccess(true)
//     } catch (err: any) {
//       console.error("Registration error:", err)
//       setError(err.message || "An error occurred during registration")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
//       <div className="w-full max-w-md space-y-8">
//         <div className="text-center">
//           <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
//           <p className="mt-2 text-sm text-gray-600">
//             Already have an account?{" "}
//             <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
//               Sign in
//             </a>
//           </p>
//         </div>

//         <div className="mt-8 rounded-lg bg-white p-8 shadow-lg">
//           {error && (
//             <div className="mb-4 rounded-md bg-red-50 p-4">
//               <div className="flex">
//                 <div className="flex-shrink-0">
//                   <svg
//                     className="h-5 w-5 text-red-400"
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                     aria-hidden="true"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm text-red-700">{error}</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {success && (
//             <div className="mb-4 rounded-md bg-green-50 p-4">
//               <div className="flex">
//                 <div className="flex-shrink-0">
//                   <svg
//                     className="h-5 w-5 text-green-400"
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                     aria-hidden="true"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm text-green-700">
//                     Registration successful! Please check your email to verify your account.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="space-y-6">
//             <div>
//               <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
//                 Full Name
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="displayName"
//                   name="displayName"
//                   type="text"
//                   required
//                   className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                   placeholder="John Doe"
//                   value={displayName}
//                   onChange={(e) => setDisplayName(e.target.value)}
//                   disabled={loading}
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email address
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                   placeholder="you@example.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   disabled={loading}
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="new-password"
//                   required
//                   className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                   placeholder="••••••••"
//                   value={password}
//                   onChange={(e) => {
//                     setPassword(e.target.value)
//                     if (confirmPassword) {
//                       // Validate on change if confirmPassword has a value
//                       if (e.target.value !== confirmPassword) {
//                         setPasswordError("Passwords do not match")
//                       } else {
//                         setPasswordError("")
//                       }
//                     }
//                   }}
//                   disabled={loading}
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                 Confirm Password
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type="password"
//                   autoComplete="new-password"
//                   required
//                   className={`block w-full appearance-none rounded-md border ${
//                     passwordError ? "border-red-300" : "border-gray-300"
//                   } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
//                   placeholder="••••••••"
//                   value={confirmPassword}
//                   onChange={(e) => {
//                     setConfirmPassword(e.target.value)
//                     if (e.target.value !== password) {
//                       setPasswordError("Passwords do not match")
//                     } else {
//                       setPasswordError("")
//                     }
//                   }}
//                   disabled={loading}
//                 />
//                 {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
//               </div>
//             </div>

//             <div>
//               <button
//                 type="button"
//                 onClick={handleRegister}
//                 disabled={loading || !email || !password || !confirmPassword || !displayName || Boolean(passwordError)}
//                 className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70"
//               >
//                 {loading ? (
//                   <>
//                     <svg
//                       className="mr-2 h-4 w-4 animate-spin text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     Creating account...
//                   </>
//                 ) : (
//                   "Create Account"
//                 )}
//               </button>
//             </div>
//           </div>

//           <div className="mt-6">
//             <p className="text-center text-xs text-gray-600">
//               By signing up, you agree to our{" "}
//               <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
//                 Terms of Service
//               </a>{" "}
//               and{" "}
//               <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
//                 Privacy Policy
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Register
