import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getApplication } from "../../http/requests/getRequest";
import ApplicationModal from "../modal/ApplicationModal";

interface ApplicationData {
  fields: {
    "App ID": number;
    Status: string;
    Applicants: string[];
    Broker: string[];
    License?: Array<{
      url: string;
      name: string;
      mimeType: string;
    }>;
    Passport?: Array<{
      url: string;
      name: string;
      mimeType: string;
    }>;
    Payslips?: Array<{
      url: string;
      name: string;
      mimeType: string;
    }>;
  };
  recordId: string;
}

interface ApplicantData {
  fields: {
    "First Name": string;
    Applicant_ID: number;
    "Residential Address": string;
    Employer: string[];
  };
  recordId: string;
}

interface BrokerData {
  fields: {
    Broker_ID: number;
    "Company Name": string;
    "3rd Party Aggregator": string;
    "3rd Party CRM": string;
    Contact: string[];
  };
  recordId: string;
}

interface StructuredData {
  applications_data: ApplicationData[];
  applicant_data: ApplicantData[];
  broker_data: BrokerData;
}

function Applications() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [applicationData, setApplicationData] = useState<StructuredData | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<ApplicationData | null>(null);
  const filterRef = useRef<HTMLDivElement | null>(null);

  const stageHeader = [
    {
      text: "Lead Stage",
      border: "border-amber-300",
      icon: "/Vector 2.svg",
    },
    {
      text: "Research Stage",
      border: "border-pink-300",
      icon: "/Vector 2 (1).svg",
    },
    {
      text: "Pre Submission",
      border: "border-red-300",
      icon: "/Vector 2 (2).svg",
    },
    {
      text: "Submission",
      border: "border-green-300",
      icon: "/Vector 2 (3).svg",
    },
    {
      text: "Post Submission",
      border: "border-blue-300",
      icon: "/Vector 2 (4).svg",
    },
    {
      text: "Settlement",
      border: "border-sky-300",
      icon: "/Vector 2 (5).svg",
    },
    {
      text: "Post Settlement",
      border: "border-rose-300",
      icon: "/Vector 2 (6).svg",
    },
  ];

  const statusOptions = ["Document Capture", "Processing", "Completed"];

  const getdatas = async () => {
    try {
      const records = await getApplication();

      // Extracting the actual structure you need
      const structuredData = records.structure_data;
      console.log(structuredData);

      // Ensure it matches the StructuredData type before setting state
      setApplicationData(structuredData as StructuredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterApplications = () => {
    if (!applicationData) return [];

    let filtered = [...applicationData.applications_data];

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.fields["App ID"]
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          app.fields.Status.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filters
    if (selectedFilters.length > 0) {
      filtered = filtered.filter((app) =>
        selectedFilters.includes(app.fields.Status)
      );
    }

    return filtered;
  };

  const toggleFilter = (status: string) => {
    setSelectedFilters((prev) =>
      prev.includes(status)
        ? prev.filter((f) => f !== status)
        : [...prev, status]
    );
  };

  useEffect(() => {
    getdatas();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };

    if (typeof document !== "undefined" && isFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      if (typeof document !== "undefined") {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [isFilterOpen]);

  const handleReviewClick = (application: ApplicationData) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const filteredApplications = filterApplications();

  return (
    <div className="min-h-screen flex flex-col" id="application-bg">
      <Navbar />
      <main className="flex-1 flex flex-col">
        {/* 1st Section - view and filter */}
        <div className="h-[30vh] flex flex-col" id="dashboard-bg">
          {/* Top Section - Market Trends */}
          <div className="flex-grow p-4 flex items-center justify-center text-white text-center mx-10">
            <div className="flex p-5 w-full h-full justify-between items-center">
              <div className="flex space-x-2">
                <img src="/view-icon.svg" alt="eye-icon" />
                <span className="text-gray-100 font-md">View Only</span>
              </div>
              <div className="flex space-x-5">
                <input
                  type="text"
                  placeholder="Search ID/ Client / Status"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-l border-b border-gray-200 rounded-md bg-black text-gray-400 py-1 px-10"
                />
                <div ref={filterRef} className="relative inline-block">
                  <button
                    type="button"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="inline-flex cursor-pointer w-full font-bold justify-center gap-x-5 rounded-md bg-white px-10 py-1 text-lg text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                  >
                    Filter
                    <svg
                      className={`size-7 text-black font-bold transition-transform ${
                        isFilterOpen ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {isFilterOpen && (
                    <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {statusOptions.map((status) => (
                          <label
                            key={status}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedFilters.includes(status)}
                              onChange={() => toggleFilter(status)}
                              className="mr-2"
                            />
                            {status}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Fixed at the bottom */}
          <div
            className="h-24 flex items-center justify-center text-white text-center p-4 w-full"
            id="applicantion-header-bg"
          >
            <div className="flex flex-col items-center space-y-2">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-300 to-violet-600 bg-clip-text text-transparent">
                Your Applications
              </h2>
              <p className="text-2xl text-white">
                AI-Powered application tracking
              </p>
            </div>
          </div>
        </div>

        {/* 2nd Section - stage header*/}
        <div className="flex-1 flex flex-col mx-10">
          <div className="grid grid-cols-7 px-6 pt-6 gap-2">
            {stageHeader.map((stage, index) => (
              <div
                key={index}
                className={`relative w-full bg-stone-200 p-2 border-2 ${stage.border} rounded-r-full`}
              >
                {/* Inner Box */}
                <div className="h-full w-full bg-white flex justify-start items-center pl-2 rounded-r-full">
                  <img src={stage.icon} alt="icon" className="h-5 w-5" />
                  <span className="font-bold text-violet-700 ml-2 text-sm">
                    {stage.text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3rd Section - Stage Cards */}
        <div className="flex-1 mx-10 mt-2 overflow-auto">
          <div className="grid grid-cols-7 px-6 gap-2 min-h-[calc(100vh-30vh-12rem)]">
            {/* Lead Stage Column */}
            <div className="flex flex-col gap-2 h-full">
              {filteredApplications.map((app) => (
                <div
                  key={app.recordId}
                  className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow duration-200 border-2 border-amber-300"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm capitalize font-semibold">
                      {app.fields.Status}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-violet-800 py-2 text-center">
                    App ID: {app.fields["App ID"]}
                  </h4>
                  <button
                    onClick={() => handleReviewClick(app)}
                    className="relative p-[2px] rounded-full bg-gradient-to-r from-violet-500 to-violet-800 cursor-pointer w-full"
                  >
                    <div className="text-black font-medium text-sm bg-white rounded-full p-1 hover:bg-opacity-95">
                      Review Document
                    </div>
                  </button>
                </div>
              ))}
            </div>
            {/* Empty columns for other stages */}
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex flex-col gap-2 h-full">
                <div className="h-full min-h-[100px] flex items-center justify-center"></div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      {selectedApplication && applicationData && (
        <ApplicationModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedApplication(null);
          }}
          applicationData={selectedApplication}
          applicantData={applicationData.applicant_data.filter((applicant) =>
            selectedApplication.fields.Applicants.includes(applicant.recordId)
          )}
          brokerData={applicationData.broker_data}
        />
      )}
    </div>
  );
}

export default Applications;
