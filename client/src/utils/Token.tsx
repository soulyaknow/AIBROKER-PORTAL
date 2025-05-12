export const getToken = () => localStorage.getItem("token");

export const removeToken = (): string | null => {
  const token = localStorage.getItem("token");
  localStorage.removeItem("token");
  return token;
};
