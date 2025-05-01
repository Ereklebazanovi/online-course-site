import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { clearUser } from "../features/auth/authSlice";
import { Menu, Dropdown, Button, Drawer, type MenuProps } from "antd";
import {
  ReadOutlined,
  DashboardOutlined,
  LogoutOutlined,
  UserOutlined,
  UserAddOutlined,
  MenuOutlined,
  DownOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const Navbar: FC = () => {
  const uid = useAppSelector((s: any) => s.auth.uid);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(clearUser());
    navigate("/");
    setDrawerOpen(false);
  };

  // Desktop courses with detailed icons and hover effects
  const courseItems: MenuProps["items"] = [
    {
      key: "english",
      label: <Link to="/courses/english">English</Link>,
      icon: <ReadOutlined className="text-xl text-gray-600" />,
      className: "hover:bg-blue-50",
    },
    {
      key: "mathematics",
      label: <Link to="/courses/mathematics">Mathematics</Link>,
      icon: <ReadOutlined className="text-xl text-gray-600" />,
      className: "hover:bg-blue-50",
    },
    {
      key: "history",
      label: <Link to="/courses/history">History</Link>,
      icon: <ReadOutlined className="text-xl text-gray-600" />,
      className: "hover:bg-blue-50",
    },
    {
      key: "georgian",
      label: <Link to="/courses/georgian">Georgian</Link>,
      icon: <ReadOutlined className="text-xl text-gray-600" />,
      className: "hover:bg-blue-50",
    },
  ];

  // Mobile menu items (courses + auth) with icons and hover effects
  const mobileItems: MenuProps["items"] = [
    ...courseItems.map((item) => ({
      ...item,
      className: "hover:bg-blue-50",
    })),
    { type: "divider" },
    ...(uid
      ? [
          {
            key: "dashboard",
            label: <Link to="/dashboard">Dashboard</Link>,
            icon: <DashboardOutlined className="text-xl text-gray-600" />,
            className: "hover:bg-blue-50",
          },
          {
            key: "logout",
            label: "Logout",
            icon: <LogoutOutlined className="text-xl text-red-600" />,
            onClick: handleLogout,
            className: "text-red-600 hover:bg-red-50",
          },
        ]
      : [
          {
            key: "login",
            label: <Link to="/login">Login</Link>,
            icon: <UserOutlined className="text-xl text-gray-600" />,
            className: "hover:bg-blue-50",
          },
          {
            key: "register",
            label: <Link to="/register">Register</Link>,
            icon: <UserAddOutlined className="text-xl text-gray-600" />,
            className: "hover:bg-blue-50",
          },
        ]),
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
        {/* Left: Logo + Courses */}
        <div className="flex items-center space-x-8">
          <Link
            to="/"
            className="whitespace-nowrap text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400 transition-transform duration-200 hover:scale-105"
          >
            Herald Of Digital
          </Link>

          <Dropdown
            menu={{ items: courseItems }}
            trigger={["click"]}
            placement="bottomLeft"
            arrow
            overlayClassName="shadow-lg rounded-lg"
          >
            <Button
              type="text"
              className="flex items-center gap-2 text-base font-medium text-blue-700 hover:text-blue-800"
            >
              Entrance Courses
              <DownOutlined />
            </Button>
          </Dropdown>
         
         <div>
       
            <Button
              type="text"
              className="flex items-center gap-2 text-base font-medium text-blue-700 hover:text-blue-800"
            >
              მასწავლებლები
             
            </Button>
         
         </div>
        </div>

        {/* Right: Auth (desktop) + Burger (mobile) */}
        <div className="flex items-center space-x-4">
          {/* Auth links on md+ */}
          <div className="hidden md:flex items-center space-x-4">
            {uid ? (
              <>
                <Link to="/dashboard">
                  <Button type="link" className="px-3 hover:text-blue-600 transition-colors duration-200">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  danger
                  onClick={handleLogout}
                  icon={<LogoutOutlined />}
                  className="px-4 hover:scale-105 transition-transform duration-200"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button type="link" className="px-3 hover:text-blue-600 transition-colors duration-200">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    type="primary"
                    className="px-4 hover:scale-105 transition-transform duration-200"
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile burger */}
          <Button
            className="md:hidden"
            type="text"
            icon={<MenuOutlined className="text-2xl" />}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          />
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <Link
            to="/"
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400"
            onClick={() => setDrawerOpen(false)}
          >
            Herald Of Digital
          </Link>
        }
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        closeIcon={<CloseOutlined />}
        headerStyle={{ borderBottom: "1px solid #e5e7eb" }}
        bodyStyle={{ padding: 0 }}
        width={280}
      >
        <Menu
          mode="inline"
          items={mobileItems}
          onClick={() => setDrawerOpen(false)}
          style={{ border: "none" }}
        />
      </Drawer>
    </nav>
  );
};

export default Navbar;