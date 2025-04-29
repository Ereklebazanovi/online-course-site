// src/components/Header.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { clearUser } from '../features/auth/authSlice';
import LogoutButton from '../features/auth/LogoutButton'; // Import LogoutButton

const Header = () => {
  const uid = useAppSelector((state) => state.auth.uid);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(clearUser());
    navigate('/');
  };

  return (
    <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">OnlineCourses</Link>
      <nav className="flex gap-4">
        {uid ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <LogoutButton />
            <button onClick={handleLogout} className="text-red-600 hover:underline">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
