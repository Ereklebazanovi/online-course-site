import { FC } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import {
  UserOutlined,
  BookOutlined,
  DollarOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import SummaryCard from "../components/SummaryCard";

const AdminDashboard: FC = () => {
  const { user } = useAuth();

  const summaryData = [
    {
      title: "Users",
      value: "1,200",
      icon: <UserOutlined />,
      color: "text-blue-600",
    },
    {
      title: "Courses",
      value: "22",
      icon: <BookOutlined />,
      color: "text-purple-600",
    },
    {
      title: "Revenue",
      value: "$9,420",
      icon: <DollarOutlined />,
      color: "text-green-600",
    },
    {
      title: "Satisfaction",
      value: "89%",
      icon: <BarChartOutlined />,
      color: "text-yellow-600",
    },
  ];

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome back, Admin{" "}
          <span className="text-blue-600">
            {user?.displayName || user?.email?.split("@")[0]}
          </span>
          👋
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {summaryData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <SummaryCard {...item} />
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Quick Actions
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 text-sm">
            <li>Add or manage courses</li>
            <li>View and manage users</li>
            <li>Review recent transactions</li>
            <li>Send announcements to students</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
