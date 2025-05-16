export const getToken = () => localStorage.getItem("token");

export const removeToken = (): string | null => {
  const token = localStorage.getItem("token");
  localStorage.clear();
  return token;
};
