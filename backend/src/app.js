import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import path from "path";

import ApiResponse from "./errors/ApiResponse.js";
import ApiError from "./errors/ApiError.js";

import { protect } from "./middleware/auth.middleware.js";
import asyncHandler from "./middleware/async.middleware.js";
import notFound from "./middleware/notFound.middleware.js";
import errorHandler from "./middleware/error.middleware.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import companyRoutes from "./routes/company.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import documentSettingsRoutes from "./routes/documentSettings.routes.js";
import documentRoutes from "./routes/document.routes.js";
import auditLogRoutes from "./routes/auditLog.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import sacCodeRoutes from "./routes/sacCode.routes.js";

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  }),
);

app.use(compression());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    exposedHeaders: ["Content-Disposition"],
  }),
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use("/uploads", express.static(path.resolve("uploads")));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/companies", companyRoutes);
app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/document-settings", documentSettingsRoutes);
app.use("/api/v1/documents", documentRoutes);
app.use("/api/v1/audit-logs", auditLogRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/sac-codes", sacCodeRoutes);

app.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    res
      .status(200)
      .json(new ApiResponse(200, "Profile fetched successfully", req.user));
  }),
);

app.get(
  "/",
  asyncHandler(async (req, res) => {
    res
      .status(200)
      .json(new ApiResponse(200, "Invoice Generator API is Running"));
  }),
);

// Test Route
app.get(
  "/error",
  asyncHandler(async () => {
    throw new ApiError(400, "This is a test error");
  }),
);

app.use(notFound);

app.use(errorHandler);

export default app;
