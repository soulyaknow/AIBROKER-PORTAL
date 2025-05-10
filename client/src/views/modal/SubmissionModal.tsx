import React from "react";
import {
  X,
  Users,
  FileText,
  BadgeCheckIcon,
  RectangleEllipsisIcon,
  DollarSign,
  BadgeCheck,
  KeySquare,
  BellRing,
  CalendarDays,
} from "lucide-react";

interface FileItem {
  id: string;
  name: string;
  url: string;
  mimeType: string;
  preview?: string;
  size?: number;
  token?: string;
  height?: number;
  width?: number;
}

interface ApplicationData {
  fields: {
    "App ID": number;
    Status: string;
    Applicants?: string[];
    "Fact Find"?: FileItem[];
    Broker?: string[];
    License?: FileItem[];
    Passport?: FileItem[];
    Payslips?: FileItem[];
  };
  recordId: string;
}

type SubmissionProps = {
  onClose: () => void;
  selectedStage: ApplicationData | null;
};

function SubmissionModal({ onClose, selectedStage }: SubmissionProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl border-2 border-green-300 w-[34rem] max-w-full max-h-[90vh] relative shadow-lg flex flex-col">
        <button
          className="absolute -top-3 -right-3 bg-white border border-green-300 rounded-full p-1 shadow-md hover:bg-gray-200 cursor-pointer"
          onClick={onClose}
        >
          <X className="w-5 h-5 text-black" />
        </button>
        <div className="flex items-center justify-between p-4 border-b border-green-300">
          <h2 className="text-lg font-bold text-purple-700 flex items-center gap-2">
            <img src="/Vector 2 (3).svg" alt="icon" className="h-5 w-5" />
            Submission Stage
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-green-300">
          {[
            { icon: FileText, label: "App ID" },
            { icon: Users, label: "Applicants" },
            {
              icon: BadgeCheckIcon,
              label: "Lender Eligibility Confirmation",
            },
            { icon: DollarSign, label: "Requested Loan Amount" },
            {
              icon: RectangleEllipsisIcon,
              label: "Offset Account Number / BSB",
            },
            { icon: KeySquare, label: "Ownership Type" },
            { icon: BellRing, label: "Finance Due Date" },
            { icon: CalendarDays, label: "Estimated Settlement Date" },
            { icon: BadgeCheck, label: "Status" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 p-4 hover:bg-gray-50 font-semibold"
            >
              <item.icon className="w-5 h-5 text-purple-600" />
              <span>{item.label}</span>
              {(item.label === "App ID" && (
                <span className="text-gray-700">
                  {selectedStage?.fields?.["App ID"] ?? ""}
                </span>
              )) ||
                (item.label === "Applicants" && (
                  <span className="text-gray-700">
                    {selectedStage?.fields?.["Applicants"]?.length ?? ""}
                  </span>
                )) ||
                (item.label === "Status" && (
                  <span className="text-gray-700">
                    {selectedStage?.fields?.["Status"] ?? ""}
                  </span>
                ))}
            </div>
          ))}
        </div>
        <div className="p-4 flex justify-center border-t border-green-300">
          <button
            onClick={onClose}
            className="w-28 cursor-pointer font-semibold h-8 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-xl hover:from-purple-600 hover:to-purple-800"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubmissionModal;
