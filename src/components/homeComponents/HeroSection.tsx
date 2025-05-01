import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const HeroSection: FC = () => {
  const { user } = useAuth();

  return (
    <section className="py-20 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      {user ? (
        <>
          <h1 className="text-4xl font-bold mb-4">Welcome back, {user.displayName || user.email}!</h1>
          <Link to="/dashboard" className="mt-4 inline-block bg-white text-blue-600 py-3 px-6 rounded-lg">Go to Dashboard</Link>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-4">Unlock Your Potential with Expert-Led Courses</h1>
          <p className="mb-6">Start your learning journey today and transform your future.</p>
          <Link to="/courses" className="bg-white text-blue-600 py-3 px-6 rounded-lg mr-4">Explore Courses</Link>
          <Link to="/register" className="border-2 border-white py-3 px-6 rounded-lg">Start Free Trial</Link>
        </>
      )}
    </section>
  );
};

export default HeroSection;