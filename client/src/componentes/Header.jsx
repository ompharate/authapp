import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <div className="bg-sky-500">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-white">Auth app</h1>
        </Link>
        <ul className="flex gap-4 text-white">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img className="h-8 w-8 rounded-full object-cover" src={currentUser.profilePhoto} />
            ) : (
              <li>Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
