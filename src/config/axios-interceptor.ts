import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});
