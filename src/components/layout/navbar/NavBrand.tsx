import { FC } from "react";
import { Link } from "react-router-dom";
import { BookOutlined } from "@ant-design/icons";

const NavBrand: FC = () => (
  <Link
    to="/"
    className="flex items-center gap-2 text-2xl font-bold text-blue-600"
  >
    <BookOutlined />
    <span className="hidden sm:block">AlterFlow</span>
    <span className="sm:hidden">AF</span>
  </Link>
);

export default NavBrand;
