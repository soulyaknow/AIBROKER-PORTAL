import React, { useState } from "react";
import {
  User,
  Key,
  Folder,
  Phone,
  Building,
  Shell,
  ServerCog,
} from "lucide-react";
import Navbar from "../components/Navbar";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [crm, setCrm] = useState("");
  const [aggregator, setAggregator] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex flex-col" id="index-bg">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-transparent overflow-hidden">
          {/* Header */}
          <div className="flex justify-center items-center">
            <img src="AI Logo - white 1.svg" alt="logo" className="w-52 mt-4" />
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="text-center mb-6">
              <p className="text-gray-400 text-xl px-40">
                Sign up to create your account
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 max-w-sm mx-auto"
            >
              <div className="flex items-center border-2 border-violet-700 rounded-2xl px-4 py-3 focus-within:border-violet-500 transition-colors w-full">
                <User className="text-violet-700 mr-3" size={20} />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full outline-none text-gray-700 placeholder-gray-400"
                  placeholder="Full Name"
                />
              </div>

              <div className="flex items-center border-2 border-violet-700 rounded-2xl px-4 py-3 focus-within:border-violet-500 transition-colors w-full">
                <Folder className="text-violet-700 mr-3" size={20} />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full outline-none text-gray-700 placeholder-gray-400"
                  placeholder="Email Address"
                />
              </div>

              <div className="flex items-center border-2 border-violet-700 rounded-2xl px-4 py-3 focus-within:border-violet-500 transition-colors w-full">
                <Phone className="text-violet-700 mr-3" size={20} />
                <input
                  type="text"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full outline-none text-gray-700 placeholder-gray-400"
                  placeholder="Contact Number"
                />
              </div>

              <div className="flex items-center border-2 border-violet-700 rounded-2xl px-4 py-3 focus-within:border-violet-500 transition-colors w-full">
                <Building className="text-violet-700 mr-3" size={20} />
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full outline-none text-gray-700 placeholder-gray-400"
                  placeholder="Company Name"
                />
              </div>

              <div className="flex items-center border-2 border-violet-700 rounded-2xl px-4 py-3 focus-within:border-violet-500 transition-colors w-full">
                <Shell className="text-violet-700 mr-3" size={20} />
                <input
                  type="text"
                  value={crm}
                  onChange={(e) => setCrm(e.target.value)}
                  className="w-full outline-none text-gray-700 placeholder-gray-400"
                  placeholder="CRM"
                />
              </div>

              <div className="flex items-center border-2 border-violet-700 rounded-2xl px-4 py-3 focus-within:border-violet-500 transition-colors w-full">
                <ServerCog className="text-violet-700 mr-3" size={20} />
                <input
                  type="text"
                  value={aggregator}
                  onChange={(e) => setAggregator(e.target.value)}
                  className="w-full outline-none text-gray-700 placeholder-gray-400"
                  placeholder="Aggregator"
                />
              </div>

              <div className="flex items-center border-2 border-violet-700 rounded-2xl px-4 py-3 focus-within:border-violet-500 transition-colors w-full">
                <Key className="text-violet-700 mr-3" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full outline-none text-gray-700 placeholder-gray-400"
                  placeholder="Password"
                />
              </div>

              <div className="flex justify-center items-center text-sm w-full p-2">
                <span className="text-gray-400 select-none text-[18px] text-center">
                  By signing up, you agree to our{" "}
                  <a
                    href="https://www.instagram.com/legal/terms/"
                    className="underline"
                  >
                    Terms
                  </a>{" "}
                  &{" "}
                  <a
                    href="https://www.instagram.com/legal/privacy/"
                    className="underline"
                  >
                    Privacy Policy.
                  </a>{" "}
                  .
                </span>
              </div>

              {/* Login Button */}
              <div className="flex justify-center mb-10">
                <button
                  type="submit"
                  className="w-full bg-black border-2 cursor-pointer border-violet-700 text-white py-3 rounded-2xl hover:bg-gray-800 transition-colors duration-200 font-semibold text-lg"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Signup;
