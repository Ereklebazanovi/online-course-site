"use client"

import { type FC, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Menu, Dropdown, Button, Drawer, Avatar, Badge } from "antd"
import {
  ReadOutlined,
  DashboardOutlined,
  LogoutOutlined,
  UserOutlined,
  UserAddOutlined,
  MenuOutlined,
  DownOutlined,
  CloseOutlined,
  BookOutlined,
} from "@ant-design/icons"

const Navbar: FC = () => {
  const { user, logout } = useAuth()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [avatarError, setAvatarError] = useState(false)

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const categories = ["english", "mathematics", "history", "georgian"]
  const categoryItems = categories.map((slug) => ({
    key: slug,
    label: (
      <Link
        to={`/courses/category/${slug}`}
        onClick={() => setDrawerOpen(false)}
        className="capitalize text-gray-700 hover:text-blue-600 transition-colors"
      >
        {slug.charAt(0).toUpperCase() + slug.slice(1)}
      </Link>
    ),
    icon: <ReadOutlined className="text-blue-500" />,
  }))

  const getInitials = (name: string) => {
    if (!name) return ""
    const parts = name.split(" ")
    return parts
      .map((p) => p[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const userMenuItems = [
    {
      key: "profile",
      label: (
        <Link to="/profile" className="text-gray-700 hover:text-blue-600">
          Profile
        </Link>
      ),
      icon: <UserOutlined className="text-blue-500" />,
    },
    {
      key: "logout",
      label: <span className="text-gray-700 hover:text-blue-600">Logout</span>,
      icon: <LogoutOutlined className="text-red-500" />,
      onClick: logout,
    },
  ]

  // Assuming user.email exists and we can generate a Gravatar URL
  // This is a common way to get avatar from email
  const getGravatarUrl = (email: string) => {
    const hash = email ? email.trim().toLowerCase() : ""
    return `https://www.gravatar.com/avatar/${hash}?d=mp&s=40`
  }

  return (
    <nav
      className={`fixed top-0 w-full bg-white z-50 transition-all duration-300 ${
        scrolled ? "shadow-md bg-white/95 backdrop-blur-md" : "bg-white"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* LOGO / BRAND - Left side */}
        <Link to="/" className="text-2xl md:text-3xl font-bold text-blue-600 tracking-tight flex items-center">
          <BookOutlined className="mr-2 text-2xl md:text-3xl" />
          <span className="hidden sm:inline">Herald Of Digital</span>
          <span className="sm:hidden">HOD</span>
        </Link>

        {/* ALL NAVIGATION ELEMENTS - Right side */}
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Username display for logged in users - visible on medium screens and up */}
          {user && (
            <div className="hidden md:block text-gray-700 font-medium">
              <span>Welcome,{user.displayName || user.email}!</span>
            </div>
          )}

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-4">
            <Dropdown
              menu={{ items: categoryItems }}
              trigger={["hover"]}
              placement="bottomCenter"
              overlayClassName="shadow-lg rounded-md overflow-hidden"
            >
              <Button
                type="text"
                className="flex items-center gap-1 font-medium text-gray-700 hover:text-blue-600 h-10"
              >
                Courses <DownOutlined className="text-xs ml-1" />
              </Button>
            </Dropdown>

            {!user ? (
              <>
                <Link to="/login">
                  <Button type="text" className="font-medium text-gray-700 hover:text-blue-600 h-10">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    type="primary"
                    className="font-medium h-10 px-5 bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 rounded-md shadow-sm"
                  >
                    Register
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard">
                  <Button
                    icon={<DashboardOutlined />}
                    className="font-medium h-10 text-gray-700 hover:text-blue-600 border-gray-200 hover:border-blue-600"
                  >
                    My Courses
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* USER AVATAR - Always visible when logged in */}
          {user && (
            <Dropdown
              menu={{ items: userMenuItems }}
              trigger={["hover"]}
              placement="bottomRight"
              overlayClassName="shadow-lg rounded-md overflow-hidden"
            >
              <Button
                type="text"
                className="flex items-center gap-2 font-medium text-gray-700 hover:text-blue-600 h-10 pl-2 pr-3"
              >
                <Badge dot={false}>
                  {!avatarError && user.email ? (
                    <Avatar
                      src={getGravatarUrl(user.email)}
                      className="flex items-center justify-center"
                      size="small"
                      onError={() => setAvatarError(true)}
                    />
                  ) : (
                    <Avatar className="bg-blue-600 flex items-center justify-center" size="small">
                      {getInitials(user.name || "")}
                    </Avatar>
                  )}
                </Badge>
                <span className="hidden sm:block max-w-[120px] truncate">{user.name}</span>
                <DownOutlined className="text-xs" />
              </Button>
            </Dropdown>
          )}

          {/* BURGER MENU BUTTON - MOBILE ONLY */}
          <Button
            type="text"
            icon={<MenuOutlined className="text-xl text-gray-700" />}
            onClick={() => setDrawerOpen(true)}
            className="md:hidden h-10 w-10 flex items-center justify-center"
          />
        </div>
      </div>

      {/* MOBILE DRAWER MENU */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              {user ? (
                <>
                  {!avatarError && user.email ? (
                    <Avatar src={getGravatarUrl(user.email)} onError={() => setAvatarError(true)} />
                  ) : (
                    <Avatar className="bg-blue-600">{getInitials(user.name || "")}</Avatar>
                  )}
                  <span className="font-medium text-gray-800">{user.name}</span>
                </>
              ) : (
                <span className="font-medium text-gray-800">Menu</span>
              )}
            </div>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setDrawerOpen(false)}
              className="flex items-center justify-center h-8 w-8"
            />
          </div>
        }
        closeIcon={null}
        placement="right"
        width={300}
        bodyStyle={{ padding: "16px 0" }}
        headerStyle={{ padding: "16px", borderBottom: "none" }}
      >
        <Menu mode="inline" onClick={() => setDrawerOpen(false)} className="border-none">
          <Menu.ItemGroup key="courses" title="Course Categories">
            {categoryItems.map((item) => (
              <Menu.Item key={item.key} icon={item.icon} className="hover:text-blue-600">
                {item.label}
              </Menu.Item>
            ))}
          </Menu.ItemGroup>

          <Menu.Divider className="my-4" />

          {user ? (
            <Menu.ItemGroup key="account" title="My Account">
              <Menu.Item
                key="dashboard"
                icon={<DashboardOutlined className="text-blue-500" />}
                className="hover:text-blue-600"
              >
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
                  My Courses
                </Link>
              </Menu.Item>
              <Menu.Item
                key="profile"
                icon={<UserOutlined className="text-blue-500" />}
                className="hover:text-blue-600"
              >
                <Link to="/profile" className="text-gray-700 hover:text-blue-600">
                  Profile
                </Link>
              </Menu.Item>
              <Menu.Item
                key="logout"
                icon={<LogoutOutlined className="text-red-500" />}
                onClick={logout}
                className="hover:text-red-600"
              >
                <span className="text-gray-700 hover:text-red-600">Logout</span>
              </Menu.Item>
            </Menu.ItemGroup>
          ) : (
            <Menu.ItemGroup key="auth" title="Authentication">
              <Menu.Item key="login" icon={<UserOutlined className="text-blue-500" />} className="hover:text-blue-600">
                <Link to="/login" className="text-gray-700 hover:text-blue-600">
                  Login
                </Link>
              </Menu.Item>
              <Menu.Item
                key="register"
                icon={<UserAddOutlined className="text-green-500" />}
                className="hover:text-green-600"
              >
                <Link to="/register" className="text-gray-700 hover:text-green-600">
                  Register
                </Link>
              </Menu.Item>
            </Menu.ItemGroup>
          )}
        </Menu>
      </Drawer>
    </nav>
  )
}

export default Navbar
