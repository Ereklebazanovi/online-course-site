import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Modal, Input, Button, Alert } from "antd";
import Typography from "antd/es/typography";
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "./authSlice";
import { useLoginModal } from "../../contexts/LoginModalContext";

const { Title, Text } = Typography;

interface Props {
  open: boolean;
  onClose: () => void;
}

const LoginModal = ({ open, onClose }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { redirectTo } = useLoginModal();

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setInfo(null);

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      if (!userCred.user.emailVerified) {
        await signOut(auth);
        setError("Please verify your email address before logging in.");
        return;
      }

      const userRef = doc(db, "users", userCred.user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: userCred.user.uid,
          email: userCred.user.email,
          displayName: userCred.user.displayName || "Anonymous",
          enrolledCourses: [],
          createdAt: serverTimestamp(),
        });
      }

      dispatch(
        setUser({
          uid: userCred.user.uid,
          email: userCred.user.email,
          isEmailVerified: true,
        })
      );

      onClose();
      navigate(redirectTo || "/"); // ✅ Go back to where user came from
    } catch (err: any) {
      let msg = err.message;
      if (err.code === "auth/user-not-found")
        msg = "No account found with this email.";
      else if (err.code === "auth/wrong-password")
        msg = "Incorrect password. Try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCred.user);
      setInfo("Verification email sent. Please check your inbox.");
    } catch {
      setError("Could not resend verification. Please try again.");
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={500}
      destroyOnClose
    >
      <div className="px-6 py-6">
        <Title level={3} className="text-center mb-1">
          Log in to Your Account
        </Title>
        <Text type="secondary" className="block text-center mb-5">
          Access your enrolled courses, progress, and certificates.
        </Text>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            className="mb-4"
            action={
              error.includes("verify") && (
                <Button size="small" type="link" onClick={handleResendVerification}>
                  Resend Email
                </Button>
              )
            }
          />
        )}

        {info && (
          <Alert message={info} type="success" showIcon className="mb-4" />
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="space-y-4">
            <Input
              placeholder="Email Address"
              type="email"
              value={email}
              size="large"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input.Password
              placeholder="Password"
              value={password}
              size="large"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            htmlType="submit"
            type="primary"
            size="large"
            block
            loading={loading}
            className="mt-6 bg-blue-600 hover:bg-blue-700 border-none"
          >
            Login
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default LoginModal;
