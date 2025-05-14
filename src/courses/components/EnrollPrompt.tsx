import { FC } from "react";
import { Button } from "antd";
import { LoginOutlined } from "@ant-design/icons";

interface Props {
  enrolled: boolean;
  user: any;
  onEnroll: () => void;
}

const EnrollPrompt: FC<Props> = ({ enrolled, user, onEnroll }) => {
  if (enrolled) return null;

  return (
    <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl text-center shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-2">Want full access?</h3>
      <p className="text-gray-600 mb-4 text-sm">
        Get lifetime access to all lessons, projects, and a certificate of completion.
      </p>
      <Button
        type="primary"
        icon={!user ? <LoginOutlined /> : undefined}
        onClick={onEnroll}
        className="bg-indigo-600 hover:bg-indigo-700 border-none rounded-full px-8"
      >
        {user ? "Enroll Now" : "Login to Enroll"}
      </Button>
    </div>
  );
};

export default EnrollPrompt;
