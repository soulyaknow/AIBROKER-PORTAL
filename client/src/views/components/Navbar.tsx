import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  // Replace this with real authentication logic (from context, Redux, or local storage)
  const isAuthenticated = false; // Change to `true` to test visibility

  return (
    <nav className="bg-black shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink to="/">
              <img
                src="/Koruna-Logo-white 1.svg"
                alt="Koruna Logo"
                className="h-12 w-auto cursor-pointer"
              />
            </NavLink>
          </div>

          {/* Navigation Links (Only show if signed in) */}
          {isAuthenticated && (
            <div className="flex items-center space-x-8">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center text-violet-400 cursor-pointer px-4 rounded-lg border-2 border-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.3)] pb-1 pt-1 hover:text-white"
                    : "flex items-center text-white hover:text-violet-600 cursor-pointer px-4 rounded-xl"
                }
              >
                <img
                  src="/Dashboard-Icon 1.svg"
                  alt="Dashboard"
                  className="h-5 w-5"
                />
                <span className="ml-2 font-semibold">Dashboard</span>
              </NavLink>

              <NavLink
                to="/applications"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center text-violet-400 cursor-pointer px-4 rounded-lg border-2 border-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.3)] pb-1 pt-1 hover:text-white"
                    : "flex items-center text-white hover:text-violet-600 cursor-pointer px-4 rounded-xl"
                }
              >
                <img
                  src="/Applications-Icon.svg"
                  alt="Applications"
                  className="h-5 w-5"
                />
                <span className="ml-2 font-semibold">Applications</span>
              </NavLink>

              <NavLink
                to="/alerts"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center text-violet-400 cursor-pointer px-4 rounded-lg border-2 border-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.3)] pb-1 pt-1 hover:text-white"
                    : "flex items-center text-white hover:text-violet-600 cursor-pointer px-4 rounded-xl"
                }
              >
                <img src="/Alert-Icon.svg" alt="Alerts" className="h-5 w-5" />
                <span className="ml-2 font-semibold">Alerts</span>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
