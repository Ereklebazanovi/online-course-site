import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { auth, db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

// ✅ Custom user type including Firebase user for secure operations
export interface ExtendedUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  isAdmin: boolean;
  firebaseUser: FirebaseUser;
}

interface AuthContextType {
  user: ExtendedUser | null;
  loading: boolean;
  purchasedCourses: string[];
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasedCourses, setPurchasedCourses] = useState<string[]>([]);

  // ✅ Auth state change listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.exists() ? userSnap.data() : {};

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          isAdmin: userData?.isAdmin || false,
          firebaseUser, // ✅ Add raw Firebase user for secured operations
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // ✅ Listen for course purchases
  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "purchases"),
      where("userId", "==", user.uid),
      where("status", "==", "paid")
    );

    const unsubscribe = onSnapshot(q, (snap) => {
      const slugs = snap.docs.map((d) => d.data().courseSlug as string);
      setPurchasedCourses(slugs);
    });

    return unsubscribe;
  }, [user]);

  const signup = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => signOut(auth);

  const value = useMemo(
    () => ({
      user,
      loading,
      purchasedCourses,
      signup,
      login,
      logout,
    }),
    [user, loading, purchasedCourses]
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
