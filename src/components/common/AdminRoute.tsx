import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Spin, Alert } from "antd";

const AdminRoute = () => {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        setIsAdmin(false);
        return;
      }
      try {
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);
        const data = snap.data();
        setIsAdmin(data?.isAdmin === true);
      } catch (err) {
        console.error("Error checking admin status:", err);
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, [user]);

  if (loading || isAdmin === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="max-w-xl mx-auto p-6">
        <Alert
          message="Access Denied"
          description="You must be an admin to access this page."
          type="error"
          showIcon
        />
        <Navigate to="/" replace />
      </div>
    );
  }

  return <Outlet />;
};

export default AdminRoute;
