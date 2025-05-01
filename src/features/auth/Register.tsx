// src/features/auth/Register.tsx
// import { useState } from "react";
// import {
//   createUserWithEmailAndPassword,
//   sendEmailVerification,
//   updateProfile,
// } from "firebase/auth";
// import { auth, db } from "../../firebase";
// import { doc, setDoc, serverTimestamp } from "firebase/firestore";
// import { Link } from "react-router-dom";

// export default function Register() {
//   const [displayName, setDisplayName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleRegister = async () => {
//     setLoading(true);
//     setError("");
//     setSuccess(false);
//     if (password !== confirm) {
//       setError("Passwords do not match");
//       setLoading(false);
//       return;
//     }
//     try {
//       const { user } = await createUserWithEmailAndPassword(auth, email, password);
//       if (displayName.trim()) {
//         await updateProfile(user, { displayName: displayName.trim() });
//       }
//       await setDoc(doc(db, "users", user.uid), {
//         uid: user.uid,
//         email: user.email,
//         displayName,
//         createdAt: serverTimestamp(),
//       });
//       await sendEmailVerification(user, {
//         url: "http://localhost:5173/login",
//       });
//       setSuccess(true);
//     } catch (err: any) {
//       setError(err.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
//       <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
//         <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
//           Create your account
//         </h2>

//         {error && (
//           <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
//             {error}
//           </div>
//         )}
//         {success && (
//           <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
//             Registration successful! Please check your email to verify your account.
//           </div>
//         )}

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Name
//             </label>
//             <input
//               type="text"
//               value={displayName}
//               onChange={(e) => setDisplayName(e.target.value)}
//               disabled={loading}
//               className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               placeholder="Your full name"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Email address
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               disabled={loading}
//               className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               placeholder="you@example.com"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               disabled={loading}
//               className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               placeholder="••••••••"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               value={confirm}
//               onChange={(e) => setConfirm(e.target.value)}
//               disabled={loading}
//               className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               placeholder="••••••••"
//             />
//           </div>
//         </div>

//         <button
//           onClick={handleRegister}
//           disabled={loading}
//           className="w-full flex justify-center mt-6 py-2 px-4 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
//         >
//           {loading ? 'Registering...' : 'Sign Up'}
//         </button>

//         <p className="mt-4 text-center text-sm text-gray-600">
//           Already have an account?{' '}
//           <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
//             Log In
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

/////axali
import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function Register() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    if (password !== confirm) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName.trim()) {
        await updateProfile(user, { displayName: displayName.trim() });
      }
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName,
        createdAt: serverTimestamp(),
      });
      await sendEmailVerification(user, { url: 'http://localhost:5173/login' });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
        className="w-full max-w-md bg-white p-8 rounded shadow"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && <p className="text-green-600 mb-4 text-center">Registration successful! Check your email.</p>}

        <input
          type="text"
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full mb-6 p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}