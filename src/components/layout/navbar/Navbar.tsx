// "use client";

// import { FC, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../contexts/AuthContext";
// import { useLoginModal } from "../../contexts/LoginModalContext";
// import { useRegisterModal } from "../../contexts/RegisterModalContext";

// import { Avatar, Badge, Button, Drawer, Dropdown, Menu, Divider } from "antd";
// import {
//   BookOutlined,
//   DashboardOutlined,
//   LogoutOutlined,
//   UserOutlined,
//   UserAddOutlined,
//   ReadOutlined,
//   MenuOutlined,
//   CloseOutlined,
//   DownOutlined,
//   LoginOutlined,
// } from "@ant-design/icons";

// const Navbar: FC = () => {
//   const { user, logout } = useAuth();
//   const { open: openLoginModal } = useLoginModal();
//   const { open: openRegisterModal } = useRegisterModal(); // ✅

//   const [scrolled, setScrolled] = useState(false);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [avatarError, setAvatarError] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const categories = ["english", "mathematics", "history", "georgian"];
//   const categoryItems = categories.map((slug) => ({
//     key: slug,
//     icon: <ReadOutlined className="text-blue-500" />,
//     label: (
//       <Link
//         to={`/courses/category/${slug}`}
//         onClick={() => setDrawerOpen(false)}
//         className="capitalize block text-gray-700 hover:text-blue-600"
//       >
//         {slug.charAt(0).toUpperCase() + slug.slice(1)}
//       </Link>
//     ),
//   }));

//   const userMenuItems = [
//     {
//       key: "dashboard",
//       icon: <DashboardOutlined />,
//       label: <Link to="/dashboard">ჩემი კურსები</Link>,
//     },
//     {
//       key: "profile",
//       icon: <UserOutlined />,
//       label: <Link to="/profile">Profile</Link>,
//     },
//     {
//       key: "logout",
//       icon: <LogoutOutlined className="text-red-500" />,
//       label: (
//         <span className="text-red-500" onClick={logout}>
//           Logout
//         </span>
//       ),
//     },
//   ];

//   const getGravatarUrl = (email: string) =>
//     `https://www.gravatar.com/avatar/${email?.trim().toLowerCase()}?d=mp&s=64`;

//   const getInitials = (name: string) =>
//     name
//       ?.split(" ")
//       .map((part) => part[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2) || "U";

//   return (
//     <nav
//       className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
//         scrolled
//           ? "bg-white/80 backdrop-blur-md shadow-md"
//           : "bg-white/95 backdrop-blur-sm"
//       }`}
//     >
//       <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//         {/* Brand */}
//         <Link
//           to="/"
//           className="flex items-center gap-2 text-2xl font-bold text-blue-600"
//         >
//           <BookOutlined />
//           <span className="hidden sm:block">AlterFlow</span>
//           <span className="sm:hidden">AF</span>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center gap-6">
//           <Dropdown menu={{ items: categoryItems }} trigger={["hover"]}>
//             <Button
//               type="text"
//               className="text-gray-700 hover:text-blue-600 font-medium"
//             >
//               Categories <DownOutlined className="ml-1 text-xs" />
//             </Button>
//           </Dropdown>

//           {!user ? (
//             <>
//               <Button
//                 type="text"
//                 onClick={openLoginModal}
//                 className="text-gray-700 hover:text-blue-600"
//                 icon={<LoginOutlined />}
//               >
//                 Login
//               </Button>
//               <Button
//                 type="primary"
//                 className="bg-blue-600 hover:bg-blue-700 border-none"
//                 onClick={openRegisterModal} // ✅
//               >
//                 Register
//               </Button>
//             </>
//           ) : (
//             <Link to="/dashboard">
//               <Button
//                 icon={<DashboardOutlined />}
//                 className="hover:border-blue-500 text-gray-700"
//               >
//                 ჩემი კურსები
//               </Button>
//             </Link>
//           )}

//           {user && (
//             <Dropdown menu={{ items: userMenuItems }} trigger={["click"]}>
//               <Button type="text" className="flex items-center gap-2">
//                 <Badge dot={false}>
//                   {!avatarError && user.email ? (
//                     <Avatar
//                       src={getGravatarUrl(user.email)}
//                       onError={() => setAvatarError(true)}
//                     />
//                   ) : (
//                     <Avatar className="bg-blue-600 text-white">
//                       {getInitials(user.displayName || "")}
//                     </Avatar>
//                   )}
//                 </Badge>
//                 <span className="text-gray-700 hidden sm:block">
//                   {user.displayName || "User"}
//                 </span>
//               </Button>
//             </Dropdown>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <Button
//           icon={<MenuOutlined />}
//           className="md:hidden"
//           type="text"
//           onClick={() => setDrawerOpen(true)}
//         />
//       </div>

//       {/* Mobile Drawer */}
//       <Drawer
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         placement="right"
//         width={300}
//         title={
//           <div className="flex justify-between items-center">
//             <span className="font-medium text-lg">
//               {user?.displayName || "Menu"}
//             </span>
//             <Button
//               type="text"
//               icon={<CloseOutlined />}
//               onClick={() => setDrawerOpen(false)}
//             />
//           </div>
//         }
//       >
//         <Menu mode="inline" onClick={() => setDrawerOpen(false)}>
//           <Menu.ItemGroup key="categories" title="Course Categories">
//             {categoryItems.map((item) => (
//               <Menu.Item key={item.key} icon={item.icon}>
//                 {item.label}
//               </Menu.Item>
//             ))}
//           </Menu.ItemGroup>

//           <Divider />

//           {!user ? (
//             <Menu.ItemGroup key="guest" title="Authentication">
//               <Menu.Item
//                 key="login"
//                 icon={<UserOutlined />}
//                 onClick={() => {
//                   setDrawerOpen(false);
//                   openLoginModal(); // ✅
//                 }}
//               >
//                 Login
//               </Menu.Item>
//               <Menu.Item
//                 key="register"
//                 icon={<UserAddOutlined />}
//                 onClick={() => {
//                   setDrawerOpen(false);
//                   openRegisterModal(); // ✅
//                 }}
//               >
//                 Register
//               </Menu.Item>
//             </Menu.ItemGroup>
//           ) : (
//             <Menu.ItemGroup key="user" title="My Account">
//               {userMenuItems.map((item) => (
//                 <Menu.Item key={item.key} icon={item.icon}>
//                   {item.label}
//                 </Menu.Item>
//               ))}
//             </Menu.ItemGroup>
//           )}
//         </Menu>
//       </Drawer>
//     </nav>
//   );
// };

// export default Navbar;

/////ახალი დაყოფილი

// src/components/Navbar/Navbar.tsx
"use client";

import { FC, useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useLoginModal } from "../../../contexts/LoginModalContext";
import { useRegisterModal } from "../../../contexts/RegisterModalContext";
import NavBrand from "./NavBrand";
import NavDesktopMenu from "./NavDesktopMenu";
import NavMobileDrawer from "./NavMobileDrawer";

const Navbar: FC = () => {
  const { user, logout } = useAuth();
  const { open: openLoginModal } = useLoginModal();
  const { open: openRegisterModal } = useRegisterModal();

  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-md"
          : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <NavBrand />
        <NavDesktopMenu
          user={user}
          logout={logout}
          openLoginModal={openLoginModal}
          openRegisterModal={openRegisterModal}
        />

        {/* 🔥 Mobile Burger Button */}
        <button
          type="button"
          className="md:hidden text-gray-700 hover:text-blue-600"
          onClick={() => setDrawerOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 6.75h15m-15 5.25h15m-15 5.25h15"
            />
          </svg>
        </button>

        <NavMobileDrawer
          user={user}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          logout={logout}
          openLoginModal={openLoginModal}
          openRegisterModal={openRegisterModal}
        />
      </div>
    </nav>
  );
};

export default Navbar;
