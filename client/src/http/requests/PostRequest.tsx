import axios from "axios";

const backend_url = import.meta.env.VITE_API_URL;

// 🔐 Signup function
export const signup = async ({
  email,
  password,
  fullName,
  contactNumber,
  companyName,
}: {
  email: string;
  password: string;
  fullName: string;
  contactNumber: string;
  companyName: string;
}) => {
  try {
    const res = await axios.post(`${backend_url}/signup`, {
      email,
      password,
      fullName,
      contactNumber,
      companyName,
    });

    return res.data;
  } catch (err: any) {
    const errorMessage = err.response?.data?.error || "Signup failed";
    throw new Error(errorMessage);
  }
};

// 🔐 Signin function
export const signin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const res = await axios.post(`${backend_url}/signin`, {
      email,
      password,
    });
    if (res.data?.access_token) {
      return res.data;
    } else {
      throw new Error("No access token received.");
    }
  } catch (err: any) {
    const errorMessage = err.response?.data?.error || "Signin failed";
    throw new Error(errorMessage);
  }
};

// Upload function
export const upload = async (file: File, token: string) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(`${backend_url}/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err: any) {
    const errorMessage = err.res?.data?.error || "Uploading failed";
    throw new Error(errorMessage);
  }
};
