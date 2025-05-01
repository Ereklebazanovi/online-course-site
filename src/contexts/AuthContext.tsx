import React, { createContext, useContext, useEffect, useState, useMemo, ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  purchasedCourses: string[];
  signup: (email: string, password: string) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasedCourses, setPurchasedCourses] = useState<string[]>([]);

  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Fetch purchased courses when user logs in
  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'purchases'),
      where('userId', '==', user.uid),
      where('status', '==', 'paid')
    );
    const unsubscribe = onSnapshot(q, (snap) => {
      const slugs = snap.docs.map((d) => d.data().courseSlug as string);
      setPurchasedCourses(slugs);
    });
    return unsubscribe;
  }, [user]);

  const signup = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password).then((cred) => cred.user);

  const login = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password).then((cred) => cred.user);

  const logout = () => signOut(auth);

  const value = useMemo(
    () => ({ user, loading, purchasedCourses, signup, login, logout }),
    [user, loading, purchasedCourses]
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};