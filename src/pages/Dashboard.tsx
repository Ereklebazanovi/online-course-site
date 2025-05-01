import React, { FC } from 'react';
import { useAuth } from '../contexts/AuthContext';
import CourseCard from '../components/CourseCard';
import { Link } from 'react-router-dom';

const Dashboard: FC = () => {
  const { user, purchasedCourses } = useAuth();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Hi, {user?.displayName || user?.email}!</h1>
      {purchasedCourses.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchasedCourses.map((slug) => (
            <CourseCard
              key={slug}
              slug={slug}
              title={slug}
              thumbnail={`/assets/${slug}.jpg`}
            />
          ))}
        </div>
      ) : (
        <p>
          You haven’t purchased any courses yet. <Link to="/courses" className="text-blue-600 underline">Browse courses.</Link>
        </p>
      )}
    </div>
  );
};

export default Dashboard;