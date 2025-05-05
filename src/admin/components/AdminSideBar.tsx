import { Link, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  BookOutlined,
  UserOutlined,
  DollarOutlined,
} from "@ant-design/icons";

const links = [
  { to: "/admin", label: "Dashboard", icon: <DashboardOutlined /> },
  { to: "/admin/courses", label: "Courses", icon: <BookOutlined /> },
  { to: "/admin/users", label: "Users", icon: <UserOutlined /> },
  { to: "/admin/payments", label: "Payments", icon: <DollarOutlined /> },
];

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-white border-r shadow-md p-6 flex flex-col sticky top-0 z-20">
      <h1 className="text-2xl font-bold text-blue-600 mb-8 tracking-tight">
        Admin Panel
      </h1>
      <nav className="flex flex-col gap-2">
        {links.map(({ to, label, icon }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Placeholder */}
      <div className="mt-auto pt-6 text-xs text-gray-400">
        &copy; {new Date().getFullYear()} AlterFlow Admin
      </div>
    </aside>
  );
};

export default AdminSidebar;
