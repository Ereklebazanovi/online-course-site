import  { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

interface Props { slug: string; title: string; thumbnail: string; }
const CourseCard: FC<Props> = ({ slug, title, thumbnail }) => {
  const { user, purchasedCourses } = useAuth();
  const isPurchased = purchasedCourses.includes(slug);

  return (
    <div className="relative bg-white rounded-xl shadow p-4">
      <img src={thumbnail} alt={title} className="w-full h-32 object-cover rounded" />
      <h3 className="mt-2 font-semibold">{title}</h3>

      {!user ? (
        <Link to="/login" className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded">Login to View</Link>
      ) : isPurchased ? (
        <Link to={`/courses/${slug}/content`} className="mt-4 inline-block text-green-600">Continue Learning →</Link>
      ) : (
        <Link to={`/courses/${slug}`} className="mt-4 inline-block bg-indigo-600 text-white py-1 px-3 rounded">Buy Now</Link>
      )}
    </div>
  );
};

export default CourseCard;