import { Link } from "react-router-dom";
import {
  GithubOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
  BookOutlined,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 text-gray-700 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 text-blue-600 text-xl font-semibold mb-2"
            >
              <BookOutlined />
              AlterFlow
            </Link>
            <p className="text-sm text-gray-600">
              A better way to learn online. Explore. Learn. Grow.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-3">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-blue-600">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-blue-600">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-blue-600">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-blue-600">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-3">Connect</h4>
            <div className="flex gap-4 text-xl text-gray-600">
              <a
                href="https://github.com/Ereklebazanovi"
                target="_blank"
                rel="noreferrer"
                className="hover:text-black"
              >
                <GithubOutlined />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-700"
              >
                <LinkedinOutlined />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-red-600"
              >
                <YoutubeOutlined />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} AlterFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
