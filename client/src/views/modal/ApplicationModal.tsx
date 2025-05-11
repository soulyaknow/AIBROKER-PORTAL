import React, { useState } from "react";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Briefcase,
  File,
  DollarSign,
  Calendar,
  ArrowDown,
  Group,
} from "lucide-react";

interface ApplicationData {
  fields: {
    "App ID": number;
    Status: string;
    Applicants?: string[];
    Broker?: string[];
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
  recordId?: string;
}

interface ApplicantData {
  fields: {
    "First Name"?: string;
    "Middle Name"?: string;
    "Last Name"?: string;
    Title?: string;
    Applicant_ID?: number;
    "Residential Address"?: string;
    Employer?: string[];
  };
  recordId?: string;
}

interface BrokerData {
  fields: {
    Broker_ID?: number;
    "Company Name"?: string;
    "3rd Party Aggregator"?: string;
    "3rd Party CRM"?: string;
    Contact?: string[];
  };
  recordId?: string;
}

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicationData?: ApplicationData;
  applicantData?: ApplicantData[];
  brokerData?: BrokerData;
}

interface FileData {
  url?: string;
  name?: string;
  mimeType?: string;
}

interface FilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: {
    url?: string;
    name?: string;
    mimeType?: string;
  } | null;
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
  isOpen,
  onClose,
  file,
}) => {
  if (!isOpen || !file) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-80"
      onClick={onClose}
    >
      <div className="w-full max-w-6xl max-h-[90vh] flex flex-col items-center">
        {file.mimeType?.startsWith("image/") ? (
          <img
            src={file.url}
            alt={file.name}
            className="max-w-full max-h-[85vh] object-contain"
          />
        ) : (
          <iframe
            src={file.url}
            title={file.name}
            className="w-full h-[85vh]"
          />
        )}
        <p className="text-white mt-4 text-center">{file.name}</p>
      </div>
    </div>
  );
};

const FilePreview: React.FC<{ files: FileData[]; title: string }> = ({
  files,
  title,
}) => {
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);

  const getFileUrl = (url: string) => {
    return `https://ai-broker.korunaassist.com/${url}`;
  };

  const renderFile = (file: FileData, index: number) => {
    const fileUrl = getFileUrl(file.url ?? "");
    const fullFile = { ...file, url: fileUrl };

    if (file.mimeType?.startsWith("image/")) {
      return (
        <div
          className="cursor-pointer"
          onClick={() => setSelectedFile(fullFile)}
        >
          <img
            src={fileUrl}
            alt={`${title} ${index + 1}`}
            className="w-52 h-full rounded"
          />
        </div>
      );
    } else if (file.mimeType === "application/pdf") {
      return (
        <div
          className="cursor-pointer"
          onClick={() => setSelectedFile(fullFile)}
        >
          <iframe
            src={fileUrl}
            title={`${title} ${index + 1}`}
            className="w-full h-full rounded"
          />
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center w-full h-full text-violet-500">
          <File className="w-12 h-12" />
          <span className="ml-2">{file.name}</span>
        </div>
      );
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {files.map((file, index) => (
          <div
            key={index}
            className={`${
              files.length === 1 ? "w-full" : "w-full"
            } h-32 overflow-hidden`}
          >
            {renderFile(file, index)}
          </div>
        ))}
      </div>
      <FilePreviewModal
        isOpen={!!selectedFile}
        onClose={() => setSelectedFile(null)}
        file={selectedFile}
      />
    </>
  );
};

const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  applicationData,
  applicantData,
  brokerData,
}) => {
  if (!isOpen) return null;

  const getFullName = (applicant: ApplicantData) => {
    const { fields } = applicant;
    return `${fields["First Name"] || ""} ${fields["Middle Name"] || ""} ${
      fields["Last Name"] || ""
    }`.trim();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-transparent bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative z-50 w-full max-w-4xl h-[90vh] bg-black border-2 border-violet-800 shadow-lg rounded-lg flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 p-6">
          <div className="flex justify-center items-center border-2 border-violet-500 shadow-md rounded-t-2xl w-52 p-1 space-x-2">
            <img src="Employee 1.svg" alt="icon" className="w-6 h-6" />
            <h2 className="text-2xl font-semibold text-violet-500">Employee</h2>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <table className="w-full text-white">
              <thead className="bg-transparent">
                <tr className="text-center text-sm font-light text-gray-400">
                  <th className="p-2">Title</th>
                  <th className="p-2">First Name</th>
                  <th className="p-2">Middle Name</th>
                  <th className="p-2">Last Name</th>
                </tr>
              </thead>
              <tbody className="bg-gradient-to-b from-violet-900 to-violet-500">
                {applicantData?.map((applicant, index) => (
                  <tr
                    key={index}
                    className="text-center border border-violet-800"
                  >
                    <td className="p-2">{applicant.fields["Title"] || "NA"}</td>
                    <td className="p-2">
                      {applicant.fields["First Name"] || "NA"}
                    </td>
                    <td className="p-2">
                      {applicant.fields["Middle Name"] || "NA"}
                    </td>
                    <td className="p-2">
                      {applicant.fields["Last Name"] || "NA"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="space-y-4 text-white">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="text-violet-500 h-5 w-5" />
                  <label htmlFor="company_name">Company Name</label>
                </div>
                <input
                  type="text"
                  id="company_name"
                  value={brokerData?.fields["Company Name"]}
                  readOnly
                  className="w-full bg-transparent border border-violet-800 rounded p-2 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="text-violet-500 h-5 w-5" />
                  <label htmlFor="company_address">Company Address</label>
                </div>
                <input
                  type="text"
                  id="company_address"
                  className="w-full bg-transparent border border-violet-800 rounded p-2 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Phone className="text-violet-500 h-5 w-5" />
                    <label htmlFor="company_contact_number">
                      Company Contact Number
                    </label>
                  </div>
                  <input
                    type="text"
                    id="company_contact_number"
                    className="w-full bg-transparent border border-violet-800 rounded p-2 focus:outline-none focus:border-violet-500"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Mail className="text-violet-500 h-5 w-5" />
                    <label htmlFor="company_email_address">
                      Company Email Address
                    </label>
                  </div>
                  <input
                    type="text"
                    id="company_email_address"
                    className="w-full bg-transparent border border-violet-800 rounded p-2 focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase className="text-violet-500 h-5 w-5" />
                  <label htmlFor="job_title">Job Title</label>
                </div>
                <input
                  type="text"
                  id="job_title"
                  className="w-full bg-transparent border border-violet-800 rounded p-2 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="text-violet-500 h-5 w-5" />
                  <label htmlFor="broker">Broker</label>
                </div>
                <input
                  type="text"
                  id="broker"
                  value={brokerData?.fields["3rd Party Aggregator"]}
                  readOnly
                  className="w-full bg-transparent border border-violet-800 rounded p-2 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <File className="text-violet-500 h-5 w-5" />
                  <label>Fact Find</label>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <File className="text-violet-500 h-5 w-5" />
                  <label>Client Handover</label>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <File className="text-violet-500 h-5 w-5" />
                  <label>Passport</label>
                </div>
                {applicationData?.fields.Passport ? (
                  <FilePreview
                    files={applicationData?.fields.Passport}
                    title="Passport"
                  />
                ) : (
                  <input
                    type="text"
                    className="w-full bg-transparent border border-violet-800 rounded p-2 focus:outline-none focus:border-violet-500"
                  />
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <File className="text-violet-500 h-5 w-5" />
                  <label>License</label>
                </div>
                {applicationData?.fields.License ? (
                  <FilePreview
                    files={applicationData?.fields.License}
                    title="License"
                  />
                ) : (
                  <input
                    type="text"
                    className="w-full bg-transparent border border-violet-800 rounded p-2 focus:outline-none focus:border-violet-500"
                  />
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <File className="text-violet-500 h-5 w-5" />
                  <label>AU Identity Card</label>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <File className="text-violet-500 h-5 w-5" />
                  <label>Medicare Card</label>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <File className="text-violet-500 h-5 w-5" />
                  <label>Birth Certificate</label>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <File className="text-violet-500 h-5 w-5" />
                  <label>Payslips</label>
                </div>
                {applicationData?.fields.Payslips ? (
                  <FilePreview
                    files={applicationData.fields.Payslips}
                    title="Payslips"
                  />
                ) : (
                  <input
                    type="text"
                    className="w-full bg-transparent border border-violet-800 rounded p-2 focus:outline-none focus:border-violet-500"
                  />
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <File className="text-violet-500 h-5 w-5" />
                  <label>Bank Statement</label>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Group className="text-violet-500 h-5 w-5" />
                  <label>Applicants</label>
                </div>
                <input
                  type="text"
                  value={applicantData?.map(getFullName).join(", ")}
                  readOnly
                  className="w-full bg-transparent border border-violet-800 rounded p-2 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Group className="text-violet-500 h-5 w-5" />
                  <label>Dependents</label>
                </div>
                <input
                  type="text"
                  className="w-full bg-transparent border border-violet-800 rounded p-2 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <ArrowDown className="text-violet-500 h-5 w-5" />
                  <label>Status</label>
                </div>
                <input
                  type="text"
                  value={applicationData?.fields.Status}
                  readOnly
                  className="w-full bg-transparent border border-violet-800 rounded p-2 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Group className="text-violet-500 h-5 w-5" />
                  <label>Loans</label>
                </div>
                <input
                  type="text"
                  className="w-full bg-transparent border border-violet-800 rounded p-2 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="text-violet-500 h-5 w-5" />
                  <label>Finance Due Date</label>
                </div>
                <input
                  type="text"
                  className="w-full bg-transparent border border-violet-800 rounded p-2 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="text-violet-500 h-5 w-5" />
                  <label>Estimated Settlement Date</label>
                </div>
                <input
                  type="text"
                  className="w-full bg-transparent border border-violet-800 rounded p-2 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="text-violet-500 h-5 w-5" />
                  <label>Household Income</label>
                </div>
                <input
                  type="text"
                  className="w-full bg-transparent border border-violet-800 rounded p-2 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="text-violet-500 h-5 w-5" />
                  <label>Housing Expense</label>
                </div>
                <input
                  type="text"
                  className="w-full bg-transparent border border-violet-800 rounded p-2 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="text-violet-500 h-5 w-5" />
                  <label>Education Expense</label>
                </div>
                <input
                  type="text"
                  className="w-full bg-transparent border border-violet-800 rounded p-2 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="text-violet-500 h-5 w-5" />
                  <label>Healthcare Expense</label>
                </div>
                <input
                  type="text"
                  className="w-full bg-transparent border border-violet-800 rounded p-2 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="text-violet-500 h-5 w-5" />
                  <label>Insurance Expense</label>
                </div>
                <input
                  type="text"
                  className="w-full bg-transparent border border-violet-800 rounded p-2 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="text-violet-500 h-5 w-5" />
                  <label>Total Household Assets</label>
                </div>
                <input
                  type="text"
                  className="w-full bg-transparent border border-violet-800 rounded p-2 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="text-violet-500 h-5 w-5" />
                  <label>Total Household Expenses</label>
                </div>
                <input
                  type="text"
                  className="w-full bg-transparent border border-violet-800 rounded p-2 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="text-violet-500 h-5 w-5" />
                  <label>Household Savings</label>
                </div>
                <input
                  type="text"
                  className="w-full bg-transparent border border-violet-800 rounded p-2 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="text-violet-500 h-5 w-5" />
                  <label>Household Liabilities</label>
                </div>
                <input
                  type="text"
                  className="w-full bg-transparent border border-violet-800 rounded p-2 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="text-violet-500 h-5 w-5" />
                  <label>Loan Eligibility</label>
                </div>
                <input
                  type="text"
                  className="w-full bg-transparent border border-violet-800 rounded p-2 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Group className="text-violet-500 h-5 w-5" />
                  <label>Property Information</label>
                </div>
                <input
                  type="text"
                  className="w-full bg-transparent border border-violet-800 rounded p-2 focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;
