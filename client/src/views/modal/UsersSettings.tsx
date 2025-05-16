import React, { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { getToken } from "../../utils/Token";
import { jwtDecode } from "jwt-decode";
import { upload } from "../../http/requests/PostRequest";
import ProfileContent from "../components/ProfileContent";

interface JwtPayload {
  email: string;
  user_metadata?: {
    full_name?: string;
  };
}

interface UsersSettingsProps {
  onClose: () => void;
  profile: string | null;
}

function UsersSettings({ onClose, profile }: UsersSettingsProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const token = getToken();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("User Profile");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const res = await upload(file, token);
      console.log("Upload successful:", res);
      setImagePreview(res.url);
      window.dispatchEvent(new Event("profile-updated"));
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      setEmail(decoded.email || "");
      setName(decoded.user_metadata?.full_name || "");

      const createdAt = localStorage.getItem("created_at");
      if (createdAt) {
        const date = new Date(createdAt);
        setDateCreated(
          date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        );
      }
    }
  }, [token]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden"
      >
        {/* Sidebar */}
        <div className="w-full md:w-1/3 bg-gray-100 p-6 border-b md:border-b-0 md:border-r border-gray-300 overflow-y-auto">
          <div className="space-y-4 text-sm font-medium">
            {[
              "User Profile",
              "Usage & Activity",
              "Billing & Subscription",
              "Integrations & API Settings",
              "Accessibility & Display",
              "Help & Support",
            ].map((item, index) => {
              const isActive = activeTab === item;
              return (
                <button
                  key={index}
                  onClick={() => setActiveTab(item)}
                  className={`flex justify-between items-center w-full text-left px-4 py-2 rounded-lg cursor-pointer ${
                    isActive
                      ? "bg-violet-100 text-violet-700 font-semibold"
                      : "hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {item}
                  {isActive && <ChevronRight />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main content */}
        <div className="w-full md:w-2/3 bg-white p-6 md:p-8 overflow-y-auto max-h-[90vh] space-y-6">
          <ProfileContent
            onClose={onClose}
            profile={profile}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            dateCreated={dateCreated}
            handleFileChange={handleFileChange}
            imagePreview={imagePreview}
            activeTab={activeTab}
          />
        </div>
      </div>
    </div>
  );
}

export default UsersSettings;
