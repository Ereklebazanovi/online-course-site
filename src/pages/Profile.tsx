// src/pages/Profile.tsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  // handle avatar upload, updateProfile, etc.

  const saveProfile = async () => {
    // call Firebase updateProfile and Firestore update
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
      <label className="block mb-2">Name</label>
      <input
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />
      {/* Avatar upload, email display (readonly), password reset link, etc. */}
      <button onClick={saveProfile} className="bg-blue-600 text-white py-2 px-4 rounded">
        Save Changes
      </button>
    </div>
  );
}
