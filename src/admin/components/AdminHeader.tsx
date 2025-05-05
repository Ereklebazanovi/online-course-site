import { FC } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Avatar, Dropdown, Menu } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

const AdminHeader: FC = () => {
  const { user, logout } = useAuth();

  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Admin Profile
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const initials = user?.displayName
    ? user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : user?.email?.[0]?.toUpperCase() || "U";

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm sticky top-0 z-30">
      <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>

      <Dropdown overlay={menu} placement="bottomRight" arrow>
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="text-sm text-gray-600 hidden sm:block">
            {user?.displayName || user?.email}
          </div>
          <Avatar className="bg-blue-600 text-white">{initials}</Avatar>
        </div>
      </Dropdown>
    </header>
  );
};

export default AdminHeader;
