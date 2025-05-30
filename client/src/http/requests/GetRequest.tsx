import axios from "axios";
import { getToken } from "../../utils/Token";

const application_hub_url = import.meta.env.VITE_APPLICATION_HUB_URL;
const broker_hub_url = import.meta.env.VITE_BROKER_HUB_URL;
const applicant_hub_url = import.meta.env.VITE_APPLICANT_HUB_URL;
const api_token = import.meta.env.VITE_API_TOKEN;
const backend_url = import.meta.env.VITE_API_URL;

const getBroker = async (broker_id: string) => {
  try {
    const response = await axios.get(`${broker_hub_url}`, {
      headers: {
        Authorization: `Bearer ${api_token}`,
        "Content-Type": "application/json",
      },
    });

    const records = response.data.data.records;

    // Find the record with the matching broker_id
    const brokerData =
      records.find((record: any) => record.recordId === broker_id) || null;

    return brokerData;
  } catch (error) {
    console.error("Error fetching broker data:");
  }
};

const getApplicant = async (applicant_ids: string[]) => {
  try {
    const response = await axios.get(`${applicant_hub_url}`, {
      headers: {
        Authorization: `Bearer ${api_token}`,
        "Content-Type": "application/json",
      },
    });

    const records = response.data.data.records;

    // Filter records to get only matching applicants
    const applicantsData = records.filter((record: any) =>
      applicant_ids.includes(record.recordId)
    );

    return applicantsData;
  } catch (error) {
    console.error("Error fetching applicant data:");
  }
};

export const getApplication = async () => {
  try {
    const response = await axios.get(application_hub_url, {
      headers: {
        Authorization: `Bearer ${api_token}`,
        "Content-Type": "application/json",
      },
    });

    const applications_data = response.data.data.records;

    // Extracting broker and applicant IDs
    const extractedData = applications_data.map((record: any) => ({
      brokerID: record.fields.Broker?.[0] || null,
      applicantsID: record.fields.Applicants || [],
    }));

    const broker_id =
      extractedData.length > 0 ? extractedData[0].brokerID : null;
    const applicant_id =
      extractedData.length > 0 ? extractedData[0].applicantsID : [];

    const broker_data = await getBroker(broker_id);
    const applicant_data = await getApplicant(applicant_id);

    const structure_data = {
      applications_data,
      broker_data,
      applicant_data,
    };

    return { structure_data };
  } catch (error) {
    console.error("Error fetching application data:");
  }
};

export const getUser = async () => {
  const token = getToken();
  try {
    const res = await axios.get(`${backend_url}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res?.data) {
      return res.data;
    } else {
      throw new Error("No user data received.");
    }
  } catch (err: any) {
    const errorMessage = err.response?.data?.error || "Failed to get user";
    throw new Error(errorMessage);
  }
};

export const getAllRegions = async () => {
  try {
    const { data } = await axios.get(`${backend_url}/region`);
    // Fix here if data is nested
    return Array.isArray(data) ? data : data.regions;
  } catch (err: any) {
    const errorMessage =
      err.response?.data?.error || "Failed to get all regions";
    throw new Error(errorMessage);
  }
};

export const getCountryDetails = async (countryName: string) => {
  try {
    const { data } = await axios.get(`${backend_url}/country/${countryName}`);
    return data;
  } catch (err: any) {
    const errorMessage =
      err.response?.data?.error || "Failed to get country details";
    throw new Error(errorMessage);
  }
};
