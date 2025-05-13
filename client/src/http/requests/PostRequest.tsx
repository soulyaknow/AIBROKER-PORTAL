import { supabase } from "../../utils/SupabaseClient";

// Fix the File name

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
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        contact_number: contactNumber,
        company_name: companyName,
      },
    },
  });

  if (error) throw error;
  return data;
};

// 🔐 Signin function
export const signin = async (
  email: string,
  password: string
): Promise<string> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  // Ensure that data.session contains an access_token
  if (data?.session?.access_token) {
    return data.session.access_token; // Return only the token as a string
  } else {
    throw new Error("No access token found.");
  }
};

// 🔐 Example: Call a protected route
export const getProtectedData = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const token = session?.access_token;
  if (!token) throw new Error("No access token available");

  const res = await fetch("http://localhost:1500/api/protected", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch protected data");
  }

  return res.json();
};
