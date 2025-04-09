import Cookies from "js-cookie";

export const getEmail = () => Cookies.get("email");
export const getPassword = () => Cookies.get("password");

export const setEmailPassword = (
  email: string,
  password: string,
  rememberMe: boolean
) => {
  if (rememberMe) {
    Cookies.set("email", email, { expires: 30 });
    Cookies.set("password", password, { expires: 30 });
  }
};

export const removeEmailPassword = () => {
  Cookies.remove("email");
  Cookies.remove("password");
};
