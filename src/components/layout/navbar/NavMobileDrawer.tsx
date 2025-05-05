import { FC } from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  Menu,
  Divider,
  Button,
} from "antd";
import {
  CloseOutlined,
  ReadOutlined,
  UserOutlined,
  UserAddOutlined,
  DashboardOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

interface Props {
  user: any;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  logout: () => void;
  openLoginModal: () => void;
  openRegisterModal: () => void;
}

const NavMobileDrawer: FC<Props> = ({
  user,
  drawerOpen,
  setDrawerOpen,
  logout,
  openLoginModal,
  openRegisterModal,
}) => {
  const categories = ["english", "mathematics", "history", "georgian"];
  const categoryItems = categories.map((slug) => ({
    key: slug,
    icon: <ReadOutlined />,
    label: (
      <Link to={`/courses/category/${slug}`} onClick={() => setDrawerOpen(false)}>
        {slug.charAt(0).toUpperCase() + slug.slice(1)}
      </Link>
    ),
  }));

  const userMenuItems = [
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
        <span className="text-red-500" onClick={logout}>
          Logout
        </span>
      ),
    },
  ];

  return (
    <Drawer
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      placement="right"
      width={300}
      title={
        <div className="flex justify-between items-center">
          <span className="font-medium text-lg">{user?.displayName || "Menu"}</span>
          <Button type="text" icon={<CloseOutlined />} onClick={() => setDrawerOpen(false)} />
        </div>
      }
    >
      <Menu mode="inline" onClick={() => setDrawerOpen(false)}>
        <Menu.ItemGroup key="categories" title="Course Categories">
          {categoryItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu.ItemGroup>

        <Divider />

        {!user ? (
          <Menu.ItemGroup key="guest" title="Authentication">
            <Menu.Item
              key="login"
              icon={<UserOutlined />}
              onClick={() => {
                setDrawerOpen(false);
                openLoginModal();
              }}
            >
              Login
            </Menu.Item>
            <Menu.Item
              key="register"
              icon={<UserAddOutlined />}
              onClick={() => {
                setDrawerOpen(false);
                openRegisterModal();
              }}
            >
              Register
            </Menu.Item>
          </Menu.ItemGroup>
        ) : (
          <Menu.ItemGroup key="user" title="My Account">
            {userMenuItems.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu.ItemGroup>
          
        )}
         {user?.isAdmin && (
                <Link to="/admin">
                  <Button>Admin Panel</Button>
                </Link>
              )}
      </Menu>
    </Drawer>
  );
};

export default NavMobileDrawer;
