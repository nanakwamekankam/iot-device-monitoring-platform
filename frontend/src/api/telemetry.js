// api helper file for client to fetch telemetry data

import apiClient from "./client";

export const getTelemetry = async () => {
  const response = await apiClient.get("/telemetry/");
  return response.data;
};