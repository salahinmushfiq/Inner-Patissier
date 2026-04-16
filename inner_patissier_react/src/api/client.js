// //src/api/client.js
// import axios from "axios";

// const baseURL = process.env.REACT_APP_API_URL;

// export const apiClient = axios.create({
//   baseURL,
//   withCredentials: true,
// });

// // ✅ Attach tokens automatically
// apiClient.interceptors.request.use((config) => {
//   const access_token = localStorage.getItem("access_token");
//   const guest_token = localStorage.getItem("guest_token");

//   if (access_token) {
//     config.headers.Authorization = `Bearer ${access_token}`;
//   }

//   if (guest_token) {
//     config.headers["guest_token"] = guest_token;
//   }

//   return config;
// });

// // ✅ Capture guest token from responses
// apiClient.interceptors.response.use((res) => {
//   if (res.data?.guest_token) {
//     localStorage.setItem("guest_token", res.data.guest_token);
//   }
//   return res;
// });

// export default apiClient;

import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

export const apiClient = axios.create({
  baseURL,
  withCredentials: true, // ✅ REQUIRED for cookies (guest_token)
});

// ✅ Attach ONLY access token (NOT guest_token)
apiClient.interceptors.request.use((config) => {
  const access_token = localStorage.getItem("access_token");

  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }

  return config;
});

// ❌ REMOVE guest_token handling from response
apiClient.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error)
);

export default apiClient;