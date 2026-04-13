import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL||"http://127.0.0.1:8000",
});