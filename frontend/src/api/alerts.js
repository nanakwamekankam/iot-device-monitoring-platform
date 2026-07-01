// api helper file for client to fetch alerts

import apiClient from "./client";

export const getAlerts = async () => {
  const response = await apiClient.get("/alerts/");
  return response.data;
};