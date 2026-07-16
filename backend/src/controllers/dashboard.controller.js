import asyncHandler from "../middleware/async.middleware.js";
import dashboardService from "../services/dashboard.service.js";

const getDashboardStats = asyncHandler(async (req, res) => {
  const data = await dashboardService.getDashboardStats(req.user);

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Dashboard statistics fetched successfully",
    data,
  });
});

const getRecentDocuments = asyncHandler(async (req, res) => {
  const documents = await dashboardService.getRecentDocuments();

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Recent documents fetched successfully",
    data: documents,
  });
});

const getRecentActivities = asyncHandler(async (req, res) => {
  const activities = await dashboardService.getRecentActivities();

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Recent activities fetched successfully",
    data: activities,
  });
});

const getDashboardCharts = asyncHandler(async (req, res) => {
  const data = await dashboardService.getDashboardCharts();

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Dashboard charts fetched successfully",
    data,
  });
});

export default {
  getDashboardStats,
  getRecentDocuments,
  getRecentActivities,
  getDashboardCharts,
};
