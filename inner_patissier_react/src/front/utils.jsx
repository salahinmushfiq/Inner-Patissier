// src/utils.js
// export const getHeaders = () => {
//   const token = localStorage.getItem("access_token"); // or your auth logic
//   return {
//     "Content-Type": "application/json",
//     Authorization: token ? `Bearer ${token}` : "",
//   };
// };
export const getHeaders = () => {
  const token = localStorage.getItem("access_token");
  const guestToken = localStorage.getItem("guest_token");

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) headers.Authorization = `Bearer ${token}`;
  if (guestToken) headers["guest_token"] = guestToken;

  return headers;
};
