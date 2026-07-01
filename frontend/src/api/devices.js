// api helper file for client to fetch device data

import apiClient from "./client";

export const getDevices = async () => {
  const response = await apiClient.get("/devices/");
  return response.data;
};

export const getDeviceById = async (id) => {
  const response = await apiClient.get(`/devices/${id}/`);
  return response.data;
};