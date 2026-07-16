import { Router } from "express";

import dashboardController from "../controllers/dashboard.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/stats", protect, dashboardController.getDashboardStats);

router.get(
  "/recent-documents",
  protect,
  dashboardController.getRecentDocuments,
);

router.get(
  "/recent-activities",
  protect,
  dashboardController.getRecentActivities,
);

router.get("/charts", protect, dashboardController.getDashboardCharts);

export default router;
