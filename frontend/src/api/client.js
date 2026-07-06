// creates one reusable Axios client.

import axios from "axios";

const API_BASE_URL = "http://13.58.158.65:8000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
