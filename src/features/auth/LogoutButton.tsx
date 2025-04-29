// LogoutButton.tsx
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { clearUser } from './authSlice';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(clearUser());
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="text-red-600 hover:underline">
      Logout
    </button>
  );
}
