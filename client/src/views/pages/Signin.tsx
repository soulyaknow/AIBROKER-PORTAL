import React, { useEffect, useState } from "react";
import { User, Key, Eye, EyeClosed } from "lucide-react";
import Modal from "../modal/SigninModal";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { signin } from "../../http/requests/PostRequest";
import { useNavigate } from "react-router-dom";
import { setEmailPassword, getEmail, getPassword } from "../../utils/Cookies";
import { NavLink } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signin(email, password);

      if (response?.token) {
        const token = response.token;
        sessionStorage.setItem("token", token);

        setEmailPassword(email, password, rememberMe);

        navigate("/dashboard", { replace: true });
      } else {
        console.error("No token received from server.");
      }
    } catch (error) {
      console.error("Invalid username or password.", error);
      alert("Invalid username or password.");
    }
  };

  useEffect(() => {
    const savedEmail = getEmail();
    const savedPassword = getPassword();
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col" id="index-bg">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white border-2 border-violet-700 shadow-2xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-black border-b-2 border-violet-700 p-6 flex justify-between items-center px-10">
            <h1 className="text-3xl font-bold text-white">Sign in</h1>
            <img src="AI Logo - white 1.svg" alt="logo" className="w-32 mt-2" />
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="text-center mb-6">
              <p className="text-gray-400 text-xl px-40">
                Welcome back! Please sign in to your account
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 max-w-sm mx-auto"
            >
              {/* Username Input */}
              <div className="flex items-center border border-violet-700 rounded-2xl px-4 py-3 focus-within:border-violet-500 transition-colors w-full">
                <User className="text-violet-700 mr-3" size={20} />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full outline-none text-gray-600 placeholder-gray-400"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password Input */}
              <div className="flex items-center border border-violet-700 rounded-2xl px-4 py-3 focus-within:border-violet-500 transition-colors w-full">
                <Key className="text-violet-700 mr-3" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full outline-none text-gray-600 placeholder-gray-400 bg-transparent"
                  placeholder="Create your password"
                />
                {showPassword ? (
                  <Eye
                    className="text-violet-700 cursor-pointer"
                    size={20}
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <EyeClosed
                    className="text-violet-700 cursor-pointer"
                    size={20}
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex justify-between items-center text-sm w-full">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-blue-500 accent-violet-600 cursor-pointer"
                  />
                  <span className="text-black select-none font-semibold">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-800 transition-colors"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full bg-black border-2 cursor-pointer border-violet-700 text-white py-3 rounded-2xl hover:bg-gray-800 transition-colors duration-200 font-semibold text-lg"
                >
                  Login
                </button>
              </div>

              <div className="flex justify-center mt-6">
                <NavLink
                  to="/signup"
                  className="flex items-center gap-1 text-sm text-gray-400 hover:text-violet-500 transition-colors duration-200 group"
                >
                  <span>Need an account?</span>
                  <span className="text-violet-500 font-semibold group-hover:underline">
                    Sign up
                  </span>
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default Signin;
