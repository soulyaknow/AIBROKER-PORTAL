import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { getToken, removeToken } from "../../utils/Token";
import { Pen, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UsersSettings from "../modal/UsersSettings";
import { getUser } from "../../http/requests/GetRequest";

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [fullName, setFullName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileUrl, setProfileUrl] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    // Initial load of user data
    getUser()
      .then((user) => {
        setIsAuthenticated(true);
        setFullName(user.full_name || "");
        setProfileUrl(user.profile_image || null);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setFullName("");
        setProfileUrl(null);
      });

    // Listen for profile updates
    const handleProfileUpdated = () => {
      getUser()
        .then((user) => {
          setProfileUrl(user.profile_image || null);
        })
        .catch(() => {
          setProfileUrl(null);
        });
    };

    window.addEventListener("profile-updated", handleProfileUpdated);

    return () => {
      window.removeEventListener("profile-updated", handleProfileUpdated);
    };
  }, []);

  // Close dropdown if clicked outside
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       dropdownRef.current &&
  //       !dropdownRef.current.contains(event.target as Node)
  //     ) {
  //       setDropdownOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  const handleLogout = () => {
    removeToken();
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <nav className="bg-black shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <img
              src="/Koruna-Logo-white 1.svg"
              alt="Koruna Logo"
              className="h-12 w-auto cursor-pointer"
            />
          </div>

          {/* Navigation Links */}
          {isAuthenticated && (
            <div
              className="flex items-center space-x-8 relative"
              ref={dropdownRef}
            >
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

              {/* Dropdown Button */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="border-2 border-violet-400 cursor-pointer rounded-3xl p-1 bg-black"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                >
                  <img
                    src={profileUrl || "/profile-pic.jpg"}
                    alt="Profile Icon"
                    className="w-7 h-7 rounded-full"
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-gray-950 border border-gray-800 rounded-md shadow-lg z-50 px-4 py-3">
                    {/* Profile Section */}
                    <div className="flex items-center gap-3 mb-4 bg-gray-600 p-2 rounded-md">
                      <img
                        src={profileUrl || "/profile-pic.jpg"}
                        alt="Profile Icon"
                        className="w-10 h-10 rounded-full bg-white"
                      />
                      <div className="text-white">
                        <h2 className="font-medium">
                          {fullName || "Client Name"}
                        </h2>
                        <span className="text-sm text-gray-300">
                          Username/ID
                        </span>
                      </div>
                    </div>

                    {/* Account Type */}
                    <button className="w-full text-left py-2 text-sm text-white hover:bg-gray-600 font-medium cursor-pointer flex justify-between items-center px-3 rounded-3xl">
                      <span>Account type</span>
                      <span className="rounded-2xl bg-green-300 text-black px-2">
                        Free
                      </span>
                    </button>

                    {/* User Profile */}
                    <button
                      className="w-full text-left py-2 text-sm text-white hover:bg-gray-600 font-medium cursor-pointer flex justify-between items-center px-3 rounded-3xl"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <span>User Profile</span>
                      <Pen className="ml-2" size={16} />
                    </button>

                    {/* Settings */}
                    <button className="w-full text-left py-2 text-sm text-white hover:bg-gray-600 font-medium cursor-pointer flex justify-between items-center px-3 rounded-3xl">
                      <span>Settings & Privacy</span>
                      <Settings className="ml-2" size={16} />
                    </button>

                    {/* Divider */}
                    <div className="my-2 border-t border-gray-500"></div>

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left py-2 text-sm text-white hover:bg-gray-600 font-medium cursor-pointer px-3 rounded-3xl"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <UsersSettings
          onClose={() => setIsModalOpen(false)}
          profile={profileUrl}
        />
      )}
    </nav>
  );
}

export default Navbar;
