import api from "../../../api/axios";

export const getDashboardStats = async () => {
  const response = await api.get("/dashboard/stats");

  return response.data;
};

export const getRecentActivities = async () => {
  const response = await api.get("/dashboard/recent-activities");

  return response.data;
};

export const getRecentDocuments = async () => {
  const response = await api.get("/dashboard/recent-documents");

  return response.data;
};

export const getDashboardCharts = async () => {
  const response = await api.get("/dashboard/charts");

  return response.data;
};