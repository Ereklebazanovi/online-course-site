import { FC } from "react";
import { Link } from "react-router-dom";

interface Props {
  user: any;
}

const HeroCTA: FC<Props> = ({ user }) => (
  <div className="flex flex-wrap gap-4">
    {user ? (
      <>
        <Link
          to="/dashboard"
          className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 transition text-lg"
        >
          Go to Dashboard
        </Link>
        <Link
          to="/courses"
          className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition text-lg"
        >
          Explore Courses
        </Link>
      </>
    ) : (
      <>
        <Link
          to="/courses"
          className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 transition text-lg"
        >
          View Courses
        </Link>
        <Link
          to="/register"
          className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition text-lg"
        >
          Get Started
        </Link>
      </>
    )}
  </div>
);

export default HeroCTA;
