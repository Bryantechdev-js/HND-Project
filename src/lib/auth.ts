// utils/auth.ts
export const getAuthToken = () => {
  return localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token");
};
