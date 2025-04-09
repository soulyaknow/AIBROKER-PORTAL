import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

interface SignInResponse {
  success: boolean;
  token?: string;
}

export const signup = async (data: {
  fullName: string;
  email: string;
  password: string;
  contactNumber: string;
  companyName: string;
}) => {
  const res = await axios.post(`${apiUrl}/signup`, data);
  return res.data;
};

export const signin = async (
  email: string,
  password: string
): Promise<SignInResponse> => {
  try {
    const res = await axios.post<SignInResponse>(`${apiUrl}/signin`, {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
