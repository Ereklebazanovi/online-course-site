import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, Dropdown, Button, Drawer } from 'antd';
import {
  ReadOutlined,
  DashboardOutlined,
  LogoutOutlined,
  UserOutlined,
  UserAddOutlined,
  MenuOutlined,
  DownOutlined,
  CloseOutlined,
} from '@ant-design/icons';

const Navbar: FC = () => {
  const { user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Course menu items
  const courses = ['english', 'mathematics', 'history', 'georgian'];
  const courseItems = courses.map((slug) => ({
    key: slug,
    label: <Link to={`/courses/${slug}`}>{slug.charAt(0).toUpperCase() + slug.slice(1)}</Link>,
    icon: <ReadOutlined className="text-xl text-gray-600" />,
  }));

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400 hover:scale-105 transition">
            Herald Of Digital
          </Link>

          <Dropdown menu={{ items: courseItems }} trigger={[ 'click' ]} placement="bottomLeft">
            <Button type="text" className="flex items-center gap-1">
              Courses <DownOutlined />
            </Button>
          </Dropdown>
        </div>

        <div className="flex items-center space-x-4">
        {!user ? (
  <>              
    <Link to="/login"><Button type="link">Login</Button></Link>
    <Link to="/register"><Button type="primary">Register</Button></Link>
  </>
) : (
  <>
    <Link to="/dashboard"><Button icon={<DashboardOutlined />}>My Courses</Button></Link>
  <Link to="/profile"><Button icon={<UserOutlined />}>Profile</Button></Link>
    <Button danger icon={<LogoutOutlined />} onClick={logout}>Logout</Button>
  </>
)}

          <Button className="md:hidden" type="text" icon={<MenuOutlined />} onClick={() => setDrawerOpen(true)} />
        </div>
      </div>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Menu" closeIcon={<CloseOutlined />}>        
        <Menu mode="inline">
          {courseItems.map((item) => <Menu.Item key={item.key}>{item.label}</Menu.Item>)}
          {!user ? (
            <>              
              <Menu.Item key="login" icon={<UserOutlined />}><Link to="/login">Login</Link></Menu.Item>
              <Menu.Item key="register" icon={<UserAddOutlined />}><Link to="/register">Register</Link></Menu.Item>
            </>
          ) : (
            <>              
              <Menu.Item key="dashboard" icon={<DashboardOutlined />}><Link to="/dashboard">My Courses</Link></Menu.Item>
              <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>Logout</Menu.Item>
            </>
          )}
        </Menu>
      </Drawer>
    </nav>
  );
};

export default Navbar;