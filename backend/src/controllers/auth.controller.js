import asyncHandler from "../middleware/async.middleware.js";
import ApiResponse from "../errors/ApiResponse.js";
import { loginUser } from "../services/auth.service.js";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const data = await loginUser({
    email,
    password,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Login successful", data));
});