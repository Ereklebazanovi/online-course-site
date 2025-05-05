import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Modal, Input, Button, Alert, Typography } from "antd";

const { Title, Text } = Typography;

interface Props {
  open: boolean;
  onClose: () => void;
}

const RegisterModal = ({ open, onClose }: Props) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (password !== confirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName.trim()) {
        await updateProfile(user, { displayName: displayName.trim() });
      }

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: displayName.trim(),
        enrolledCourses: [],
        createdAt: serverTimestamp(),
      });

      await sendEmailVerification(user, {
        url: "http://localhost:5173/login", // Or your live site
      });

      setSuccess(true);
      setDisplayName("");
      setEmail("");
      setPassword("");
      setConfirm("");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
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
          Create Your Account
        </Title>
        <Text type="secondary" className="block text-center mb-5">
          Start learning your favorite topics with lifetime access.
        </Text>

        {error && (
          <Alert message={error} type="error" showIcon className="mb-4" />
        )}

        {success && (
          <Alert
            message="Registration successful! Check your email for verification."
            type="success"
            showIcon
            className="mb-4"
          />
        )}

        {/* ✅ Form handles Enter key */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Full Name"
              value={displayName}
              size="large"
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <Input
              placeholder="Email Address"
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
            <Input.Password
              placeholder="Confirm Password"
              value={confirm}
              size="large"
              onChange={(e) => setConfirm(e.target.value)}
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
            Register
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default RegisterModal;
