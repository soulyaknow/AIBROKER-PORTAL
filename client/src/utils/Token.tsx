export const getToken = () => sessionStorage.getItem("token");

export const removeToken = (): string | null => {
  const token = sessionStorage.getItem("token");
  sessionStorage.removeItem("token");
  return token;
};
