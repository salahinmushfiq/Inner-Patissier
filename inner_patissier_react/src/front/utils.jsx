// src/utils.js
export const getHeaders = () => {
  const token = localStorage.getItem("access_token"); // or your auth logic
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};
