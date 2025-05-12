import { FC } from "react";
import { Link } from "react-router-dom";
import { Avatar, Badge, Button, Dropdown, MenuProps } from "antd";
import {
  DashboardOutlined,
  DownOutlined,
  LoginOutlined,
  ReadOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import type { ExtendedUser } from "../../../contexts/AuthContext";

interface Props {
  user: ExtendedUser | null;
  logout: () => void;
  openLoginModal: () => void;
  openRegisterModal: () => void;
}

const NavDesktopMenu: FC<Props> = ({
  user,
  logout,
  openLoginModal,
  openRegisterModal,
}) => {
  const categories = ["english", "mathematics", "history", "georgian"];

  const categoryItems: MenuProps["items"] = categories.map((slug) => ({
    key: slug,
    icon: <ReadOutlined className="text-blue-500" />,
    label: (
      <Link
        to={`/courses/category/${slug}`}
        className="capitalize block text-gray-700 hover:text-blue-600"
      >
        {slug.charAt(0).toUpperCase() + slug.slice(1)}
      </Link>
    ),
  }));

  const userMenuItems: MenuProps["items"] = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">ჩემი კურსები</Link>,
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: <Link to="/profile">Profile</Link>,
    },
    {
      key: "logout",
      icon: <LogoutOutlined className="text-red-500" />,
      label: (
        <span className="text-red-500 cursor-pointer" onClick={logout}>
          Logout
        </span>
      ),
    },
  ];

  const getGravatarUrl = (email: string) =>
    `https://www.gravatar.com/avatar/${email.trim().toLowerCase()}?d=mp&s=64`;

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  return (
    <div className="hidden md:flex items-center gap-6">
      <Dropdown menu={{ items: categoryItems }} trigger={["hover"]}>
        <Button type="text" className="text-gray-700 hover:text-blue-600 font-medium">
          Categories <DownOutlined className="ml-1 text-xs" />
        </Button>
      </Dropdown>

      {!user ? (
        <>
          <Button
            type="text"
            onClick={openLoginModal}
            className="text-gray-700 hover:text-blue-600"
            icon={<LoginOutlined />}
          >
            Login
          </Button>
          <Button
            type="primary"
            className="bg-blue-600 hover:bg-blue-700 border-none"
            onClick={openRegisterModal}
          >
            Register
          </Button>
        </>
      ) : (
        <>
          <Link to="/dashboard">
            <Button
              icon={<DashboardOutlined />}
              className="hover:border-blue-500 text-gray-700"
            >
              ჩემი კურსები
            </Button>
          </Link>

          <Dropdown menu={{ items: userMenuItems }} trigger={["click"]}>
            <div className="flex items-center gap-2 cursor-pointer">
              <Badge dot={false}>
                {user.email ? (
                  <Avatar src={getGravatarUrl(user.email)} />
                ) : (
                  <Avatar className="bg-blue-600 text-white">
                    {getInitials(user.displayName || "")}
                  </Avatar>
                )}
              </Badge>
              <span className="text-gray-700 hidden sm:block">
                {user.displayName || "User"}
              </span>
              {user?.isAdmin && (
                <Link to="/admin">
                  <Button size="small" type="primary">
                    Admin Panel
                  </Button>
                </Link>
              )}
            </div>
          </Dropdown>
        </>
      )}
    </div>
  );
};

export default NavDesktopMenu;
