


// import { signOut } from 'firebase/auth';
// import { auth } from '../../firebase';
// import { useDispatch } from 'react-redux';
// import { clearUser } from './authSlice';
// import { useNavigate } from 'react-router-dom';

// export default function LogoutButton() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       dispatch(clearUser());
//       navigate('/login');
//     } catch (err) {
//       console.error('Logout failed:', err);
//       alert('Failed to log out. Please try again.');
//     }
//   };

//   return (
//     <button onClick={handleLogout} className="text-red-600 hover:underline">
//       Logout
//     </button>
//   );
// }




import { useAppDispatch } from "../../app/hooks";
import { logoutUser } from "./authSlice";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/login");
    } catch (err) {
      alert("Failed to logout. Try again.");
    }
  };

  return (
    <button onClick={handleLogout} className="text-red-600 hover:underline">
      Logout
    </button>
  );
}
