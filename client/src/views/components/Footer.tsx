import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  // Replace with real authentication logic (context, Redux, or local storage)
  const isAuthenticated = false;

  return (
    <footer className="bg-transparent shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center h-20">
          {/* Show the Settings link only if the user is signed in */}
          {isAuthenticated && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) => `
                flex items-center hover:text-violet-600 cursor-pointer
                ${isActive ? "text-white" : "text-white"}
              `}
            >
              <img
                src="/Setting-Icon 1.svg"
                alt="Settings"
                className="h-5 w-5"
              />
              <span
                className={
                  location.pathname === "/dashboard"
                    ? "ml-2 bg-gradient-to-r from-pink-300 to-violet-600 bg-clip-text text-transparent font-semibold"
                    : "ml-2 font-semibold"
                }
              >
                Settings
              </span>
            </NavLink>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
