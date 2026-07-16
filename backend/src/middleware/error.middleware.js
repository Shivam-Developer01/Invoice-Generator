const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Invalid Mongo ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource id";
  }

  // Duplicate Key
  if (err.code === 11000) {
    statusCode = 409;
    message = `${Object.keys(err.keyValue).join(", ")} already exists`;
  }

  // Mongoose Validation
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  // JWT
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || [],
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};

export default errorHandler;