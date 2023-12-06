import axios from "axios";

const API_CONFIG = {
  baseURL: "https://greenvelvet.alwaysdata.net/pfc",
  token: "46f9a326dadd37dbf7fbca0c93c1d5a5e5aa9ca3",
};

const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  headers: {
    "Content-Type": "application/json",
    token: API_CONFIG.token,
  },
});

export default api;
