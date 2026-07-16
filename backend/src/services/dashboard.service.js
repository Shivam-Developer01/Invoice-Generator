import Document from "../models/document.model.js";
import Customer from "../models/customer.model.js";
import Company from "../models/company.model.js";
import User from "../models/user.model.js";
import AuditLog from "../models/auditLog.model.js";

const getDashboardStats = async (user) => {
  const firstDayOfMonth = new Date();

  firstDayOfMonth.setDate(1);
  firstDayOfMonth.setHours(0, 0, 0, 0);

  const [
    totalDocuments,
    totalCustomers,
    totalUsers,
    thisMonthDocuments,
    company,
  ] = await Promise.all([
    Document.countDocuments({ isDeleted: false }),

    Customer.countDocuments({ isActive: true }),

    User.countDocuments({ isActive: true }),

    Document.countDocuments({
      isDeleted: false,
      createdAt: {
        $gte: firstDayOfMonth,
      },
    }),

    Company.findOne().select("companyName"),
  ]);

  if (user.role === "CO_FOUNDER") {
    return {
      totalDocuments,
      totalCustomers,
      totalUsers,
      thisMonthDocuments,
    };
  }

  return {
    totalDocuments,
    totalCustomers,
    thisMonthDocuments,
  };
};

const getRecentDocuments = async () => {
  return await Document.find({
    isDeleted: false,
  })
    .populate("customerId", "customerName")
    .sort({
      createdAt: -1,
    })
    .limit(5)
    .select("documentNumber documentType totalAmount documentDate customerId");
};

const getRecentActivities = async () => {
  return await AuditLog.find()
    .sort({
      createdAt: -1,
    })
    .limit(5)
    .select("userName action entityType entityId description createdAt");
};

const getDashboardCharts = async () => {
  const documentTypes = await Document.aggregate([
    {
      $match: {
        isDeleted: false,
      },
    },
    {
      $group: {
        _id: "$documentType",
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  const monthlyResult = await Document.aggregate([
    {
      $match: {
        isDeleted: false,
      },
    },
    {
      $group: {
        _id: {
          month: {
            $month: "$createdAt",
          },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  const monthlyDocuments = Array.from(
    {
      length: 12,
    },
    (_, index) => {
      const month = index + 1;

      const existing = monthlyResult.find((item) => item._id.month === month);

      return {
        month,
        count: existing ? existing.count : 0,
      };
    },
  );

  return {
    documentTypes,
    monthlyDocuments,
  };
};

export default {
  getDashboardStats,
  getRecentDocuments,
  getRecentActivities,
  getDashboardCharts,
};
