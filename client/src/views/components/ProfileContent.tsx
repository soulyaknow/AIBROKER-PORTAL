import React, { useState } from "react";
import {
  CalendarDays,
  Pencil,
  X,
  SquarePen,
  Eye,
  FileText,
  FileCheck,
  FilePlus,
  Settings,
  CircleGauge,
  RotateCw,
} from "lucide-react";
import ToggleSwitch from "./ToggleComponent";

interface ProfileContentProps {
  onClose: () => void;
  profile: string | null;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  dateCreated: string;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreview: string | null;
  activeTab: string;
}

function ProfileContent({
  onClose,
  profile,
  name,
  setName,
  email,
  setEmail,
  dateCreated,
  handleFileChange,
  imagePreview,
  activeTab,
}: ProfileContentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [toggles, setToggles] = useState({
    drive: true,
    slack: true,
    zapier: true,
    gmail: true,
    dropbox: true,
    webhook: true,
    throttling: true,
    retry: false,
  });

  type ToggleKeys = keyof typeof toggles;

  // Define your apps with keys matching toggles keys
  const apps: { name: string; logo: string; key: ToggleKeys }[] = [
    { name: "Google Drive", logo: "/logos_google-drive.svg", key: "drive" },
    { name: "Slack", logo: "/devicon_slack.svg", key: "slack" },
    { name: "Zapier", logo: "/lineicons_zapier.svg", key: "zapier" },
    { name: "Gmail", logo: "/logos_google-gmail.svg", key: "gmail" },
    { name: "Dropbox", logo: "/logos_dropbox.svg", key: "dropbox" },
  ];

  const handleToggle = (key: ToggleKeys) => {
    setToggles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div>
      {activeTab === "User Profile" && (
        <>
          <div className="flex justify-start space-x-4 items-center">
            <h2 className="text-xl font-bold text-gray-800">Edit My Profile</h2>
            <button
              className="cursor-pointer bg-white hover:bg-gray-300 p-2 rounded-2xl"
              onClick={handleEditClick}
            >
              {isEditing ? (
                <X className="text-violet-500" />
              ) : (
                <Pencil className="text-violet-500" />
              )}
            </button>
          </div>

          {/* Profile Picture */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-violet-300 overflow-hidden">
              <img
                src={imagePreview || (profile ? profile : "/profile-pic.jpg")}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <input
              type="file"
              accept="image/*"
              id="profile-upload"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="profile-upload"
              className="border border-violet-500 text-violet-700 px-4 py-1 rounded-full hover:bg-violet-50 cursor-pointer"
            >
              Upload photo
            </label>
          </div>

          {/* Form Fields */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-violet-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-violet-400"
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-violet-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-violet-400"
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Username/ID
              </label>
              <input
                type="text"
                className="w-full border border-violet-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-violet-400"
                disabled={!isEditing}
              />
            </div>

            <div className="flex flex-col">
              <div className="flex space-x-3 justify-start items-center">
                <label className="block text-sm font-medium mb-1">
                  Account Type
                </label>
                <div className="flex gap-2">
                  {["Free", "Pro", "Enterprise"].map((type) => (
                    <span
                      key={type}
                      className={`text-xs font-medium px-4 rounded-full ${
                        type === "Free"
                          ? "bg-green-200 text-green-900"
                          : type === "Pro"
                          ? "bg-yellow-200 text-yellow-900"
                          : "bg-purple-200 text-purple-900"
                      }`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              <input
                type="text"
                className="w-full border border-violet-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-violet-400"
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Registration Date
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={dateCreated}
                  className="w-full border border-violet-300 rounded-lg px-4 py-2 pr-10 outline-none focus:ring-2 focus:ring-violet-400"
                  disabled
                />
                <CalendarDays
                  className="absolute right-3 top-2.5 text-violet-500"
                  size={18}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                className="px-8 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 cursor-pointer"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-2 bg-violet-600 text-white rounded-full hover:bg-violet-800 shadow-md cursor-pointer"
                disabled={!isEditing}
              >
                Save
              </button>
            </div>
          </form>
        </>
      )}

      {activeTab === "Usage & Activity" && (
        <div className="space-y-6">
          <div className="flex flex-col space-y-2">
            <h2 className="text-xl font-bold text-violet-800">
              Usage & Activity
            </h2>
            <p className="text-gray-600">
              View your recent activity log below.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                icon: <SquarePen className="text-violet-600 w-6 h-6" />,
                title: "Recently edited document",
              },
              {
                icon: <Eye className="text-violet-600 w-6 h-6" />,
                title: "Recently viewed document",
              },
              {
                icon: <FileText className="text-violet-600 w-6 h-6" />,
                title: "Recently commented document",
              },
              {
                icon: <FileCheck className="text-violet-600 w-6 h-6" />,
                title: "Recently submitted document",
              },
              {
                icon: <FilePlus className="text-violet-600 w-6 h-6" />,
                title: "Recently created document",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-2 border-violet-300 rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center space-x-4">
                  {activity.icon}
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {activity.title}
                    </h4>
                    <span className="text-sm text-gray-500">
                      4/7/25, 7:56 AM GMT+8
                    </span>
                  </div>
                </div>
                <button className="px-4 py-1 bg-violet-600 text-white font-medium rounded-full hover:bg-violet-800 transition">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "Billing & Subscription" && (
        <div>
          <h2 className="text-xl font-bold">Billing & Subscription</h2>
          <p>Billing and subscription details go here.</p>
        </div>
      )}

      {activeTab === "Integrations & API Settings" && (
        <div className="space-y-6">
          <div className="flex flex-col space-y-2">
            <h2 className="text-xl font-bold text-violet-800">
              Integrations & API Settings
            </h2>
            <p className="text-gray-600">
              Manage your app connections, webhooks, and automation settings.
            </p>
          </div>

          {/* Connected Apps */}
          <div className="flex flex-col w-full space-y-4">
            <h3 className="text-lg font-semibold">Your Connected Apps</h3>
            <div className="divide-y divide-violet-800 border border-violet-800 rounded-xl">
              {apps.map((app) => (
                <div
                  key={app.key}
                  className="flex items-center justify-between p-4"
                >
                  <div className="flex items-center space-x-3">
                    <img src={app.logo} alt={app.name} className="h-6 w-6" />
                    <span className="font-medium">{app.name}</span>
                  </div>
                  <ToggleSwitch
                    isOn={toggles[app.key]}
                    onToggle={() => handleToggle(app.key)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Webhooks & Automation */}
          <div className="flex flex-col w-full space-y-4">
            <h3 className="text-lg font-semibold">Webhooks & Automation</h3>
            <div className="border border-violet-800 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Settings className="text-violet-700" />
                  <span className="font-semibold">
                    Configure endpoint for AI outputs
                  </span>
                </div>
                <ToggleSwitch
                  isOn={toggles.webhook}
                  onToggle={() => handleToggle("webhook")}
                />
              </div>
            </div>
          </div>

          {/* System Settings */}
          <div className="flex flex-col w-full space-y-4">
            <h3 className="text-lg font-semibold">System Settings</h3>
            <div className="border border-violet-800 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CircleGauge className="text-violet-700" />
                  <span className="font-semibold">Throttling</span>
                </div>
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-violet-700"
                  checked={toggles.throttling}
                  onChange={() => handleToggle("throttling")}
                />
              </div>
              <hr className="border-violet-800" />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <RotateCw className="text-violet-700" />
                  <span className="font-semibold">Retry Policies</span>
                </div>
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-violet-700"
                  checked={toggles.retry}
                  onChange={() => handleToggle("retry")}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Accessibility & Display" && (
        <div>
          <h2 className="text-xl font-bold">Accessibility & Display</h2>
          <p>Billing and subscription details go here.</p>
        </div>
      )}

      {activeTab === "Help & Support" && (
        <div>
          <h2 className="text-xl font-bold">Help & Support</h2>
          <p>Billing and subscription details go here.</p>
        </div>
      )}
    </div>
  );
}

export default ProfileContent;
