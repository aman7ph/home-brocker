import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Header: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <header className="bg-zinc-50 shadow-md">
      <div className="flex gap-5 flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <img src={logo} alt="maraki betoch logo" />
        </Link>

        <form
          action=""
          className="bg-slate-300 p-3 rounded-md flex items-center"
        >
          <input
            type="text"
            name=""
            id=""
            placeholder="search..."
            className="bg-transparent focus:outline-none w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>

        <ul className="flex gap-4 text-xl">
          <Link to="/">
            <li className="hidden sm:inline hover:underline cursor-pointer">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline hover:underline cursor-pointer">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className=" hover:underline cursor-pointer">Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
