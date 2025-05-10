import React from "react";
import {
  X,
  Users,
  FileText,
  ClipboardList,
  BadgeCheck,
  IdCard,
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
    Applicants: string[];
    "Fact Find": FileItem[];
    Broker: string[];
    License?: FileItem[];
    Passport?: FileItem[];
    Payslips?: FileItem[];
  };
  recordId: string;
}

type LeadProps = {
  onClose: () => void;
  selectedStage: ApplicationData | null;
};

function LeadModal({ onClose, selectedStage }: LeadProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl border-2 border-amber-300 w-[34rem] max-w-full max-h-[90vh] relative shadow-lg flex flex-col">
        <button
          className="absolute -top-3 -right-3 bg-white border border-amber-300 rounded-full p-1 shadow-md hover:bg-gray-200 cursor-pointer"
          onClick={onClose}
        >
          <X className="w-5 h-5 text-black" />
        </button>
        <div className="flex items-center justify-between p-4 border-b border-amber-300">
          <h2 className="text-lg font-bold text-purple-700 flex items-center gap-2">
            <img src="/Vector 2.svg" alt="icon" className="h-5 w-5" />
            Lead Stage
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-amber-300">
          {/* App ID */}
          <div className="flex items-center gap-2 p-4 hover:bg-gray-50 font-semibold">
            <FileText className="w-5 h-5 text-purple-600" />
            <span>App ID:</span>
            <span className="text-gray-700">
              {selectedStage?.fields?.["App ID"] ?? "N/A"}
            </span>
          </div>

          {/* Applicants */}
          <div className="flex items-center gap-2 p-4 hover:bg-gray-50 font-semibold">
            <Users className="w-5 h-5 text-purple-600" />
            <span>Applicants:</span>
            <span className="text-gray-700">
              {selectedStage?.fields?.Applicants?.length ?? "N/A"}
            </span>
          </div>

          {/* Fact Find (placeholder, no data yet) */}
          <div className="flex items-center gap-2 p-4 hover:bg-gray-50 font-semibold">
            <FileText className="w-5 h-5 text-purple-600" />
            <span>Fact Find</span>
            <span className="text-gray-700">
              {selectedStage?.fields?.["Fact Find"]?.length
                ? `${selectedStage?.fields?.["Fact Find"]?.length} file(s)`
                : "N/A"}
            </span>
          </div>

          {/* Client Handover (placeholder) */}
          <div className="flex items-center gap-2 p-4 hover:bg-gray-50 font-semibold">
            <ClipboardList className="w-5 h-5 text-purple-600" />
            <span>Client Handover</span>
          </div>

          {/* Passport */}
          <div className="flex items-center gap-2 p-4 hover:bg-gray-50 font-semibold">
            <IdCard className="w-5 h-5 text-purple-600" />
            <span>Passport:</span>
            <span className="text-gray-700">
              {selectedStage?.fields?.Passport?.length
                ? `${selectedStage.fields.Passport.length} file(s)`
                : "N/A"}
            </span>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 p-4 hover:bg-gray-50 font-semibold">
            <BadgeCheck className="w-5 h-5 text-purple-600" />
            <span>Status:</span>
            <span className="text-gray-700">
              {selectedStage?.fields?.Status ?? "N/A"}
            </span>
          </div>
        </div>
        <div className="p-4 flex justify-center border-t border-amber-300">
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

export default LeadModal;
